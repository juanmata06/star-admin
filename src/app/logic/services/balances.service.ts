import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';

import { iBalance } from '../interfaces/balance.interface';

import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalancesService {

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _store: Store,
    private _authService: AuthService
  ) { }

  //Here we use snapshotChanges to get attributes from the doc like id
  public initBalancesListener(uid: string) {
    return this._angularFirestore.collection(`${uid}/balances/items`)
      .snapshotChanges().pipe(
        map(snapshotValue => snapshotValue.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      );
  }

  public createBalance(balance: iBalance) {
    const uid = this._authService.user?.uid;
    return this._angularFirestore.doc(`${uid}/balances`)
      .collection('items')
      .add({ ...balance });
  }

  public deleteBalanceByUid(balanceUid: string) {
    const uid = this._authService.user?.uid;
    return this._angularFirestore.doc(`${uid}/balances/items/${balanceUid}`).delete();
  }
}
