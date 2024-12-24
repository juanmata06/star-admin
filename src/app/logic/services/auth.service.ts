import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { iUser } from '../interfaces/user.interface';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import * as authActions from '../../modules/auth/store/auth-state/auth.actions';
import * as balancesActions from '../../modules/dashboard/store/balances.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fireStoreUserSubscription: Subscription;
  private _user: iUser | null;

  constructor(
    private _router: Router,
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore,
    private _store: Store
  ) { }

  public get user() {
    return this._user;
  }

  /**
   * Listens to the user's authentication state, and updates the store with the authenticated user's information 
   * from Firestore document, or clears the state if there is no user.
   * 
   * @returns {void} Does not return any value.
   */
  public initAuthListener(): void {
    this._angularFireAuth.authState.subscribe((user: any) => {
      if (user) {
        this.fireStoreUserSubscription = this._angularFirestore.doc(`${user.uid}/user`).valueChanges()
          .subscribe((response: any) => {
            this._user = response;
            this._store.dispatch(authActions.setCurrentUser({ currentUser: response }));
          });
      } else {
        this._user = null;
        this.fireStoreUserSubscription?.unsubscribe();
        this._store.dispatch(authActions.unsetCurrentUser());
        this._store.dispatch(balancesActions.unsetItems());
      }
    });
  }

  /**
   * Registers a new user with the provided arguments in Firebase Authentication, and creates a Firestore document 
   * to store any additional user data.
   * 
   * @param {string} name - Name of the user.
   * @param {string} email - Email address for the user account.
   * @param {string} password - Password for the user account.
   * @returns {Promise<void>} Resolves when the user is successfully registered and their Firestore document is created.
   */
  public createUser(name: string, email: string, password: string): Promise<void> {
    return this._angularFireAuth.createUserWithEmailAndPassword(email, password).then(({ user }) => {

      const newUser: iUser = {
        uid: user?.uid,
        name: name,
        email: user?.email || undefined,
      };

      return this._angularFirestore.doc(`${user?.uid}/user`).set(newUser);
    });
  }

  /**
   * Authenticates the user via Firebase Authentication.
   * 
   * @param {string} email - The user account email address.
   * @param {string} password - The user account password.
   * @returns {Promise<any>} Resolves when the user is successfully authenticated via Firebase.
   */
  public logIn(email: string, password: string): Promise<any> {
    return this._angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Ends the Firebase Authentication session for the user.
   * 
   * @returns {Promise<void>} Resolves when the user is successfully logged out.
   */
  public logOut(): Promise<void> {
    return this._angularFireAuth.signOut();
  }

  /**
   * Checks if a user is currently authenticated.
   *
   * @returns {Observable<boolean>} Emits `true` if a user is authenticated, otherwise `false`.
   */
  public isAuth(): Observable<boolean> {
    return this._angularFireAuth.authState.pipe(
      map((user: any) => user != null)
    )
  }
}
