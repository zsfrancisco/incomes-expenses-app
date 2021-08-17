import {Injectable} from '@angular/core';
import {IUserLogin, IUserRegister} from "../types";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {setUser} from "../auth/auth.actions";
import {User} from "../models/user.model";
import {map} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription | undefined;

  constructor(public auth: AngularFireAuth,
              private store: Store<AppState>,
              private firestore: AngularFirestore) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(fbUser => {
      if (fbUser) {
        this.userSubscription = this.firestore.doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser: User | any) => {
            const user = User.fromFirebase(firestoreUser);
            this.store.dispatch(setUser({user}));
          })
      } else {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(setUser({user: null}));
      }
    });
  }

  registerUser(user: IUserRegister) {
    const {name, email, password} = user;
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(user?.uid, name, email);
        return this.firestore.doc(`${user?.uid}/user`).set({...newUser});
      });
  }

  signInUser(user: IUserLogin) {
    const {email, password} = user;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser(): Promise<void> {
    return this.auth.signOut();
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(map(fbUser => fbUser != null))
  }
}
