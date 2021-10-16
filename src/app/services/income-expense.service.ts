import {Injectable} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import firebase from "firebase";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {IncomeExpense} from "../models/IncomeExpense";
import {IncomeExpenseBody} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
  }

  createIncomeExpense(incomeExpense: IncomeExpense): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    const uid = this.authService.user?.uid;
    delete incomeExpense.uid;
    return this.firestore.doc(`${uid}/incomes-expenses`)
      .collection('items')
      .add({...incomeExpense});
  }

  initIncomeExpenseListener(uid: string | undefined): Observable<IncomeExpenseBody[]> {
    return this.firestore.collection(`${uid}/incomes-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(({payload}) => ({
          uid: payload.doc.id,
          ...payload.doc.data() as IncomeExpense
        })))
      );
  }

  deleteIncomeExpense(uidIncomeExpenseItem: string | undefined): Promise<void> {
    const uidUser = this.authService.user?.uid;
    return this.firestore.doc(`${uidUser}/incomes-expenses/items/${uidIncomeExpenseItem}`).delete();
  }
}
