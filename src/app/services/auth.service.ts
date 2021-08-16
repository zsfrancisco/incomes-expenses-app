import {Injectable} from '@angular/core';
import {IUserLogin, IUserRegister} from "../types";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(fbUser => {
      console.log(fbUser);
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
