import { Component, Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

// @Component({
//  providers: [AngularFireAuth],
//   template:""

// })

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }
  loginProvider;
  loginWith(loginBy: string) {
    if (loginBy == "google") {

      this.loginProvider = new firebase.auth.GoogleAuthProvider();
    } else if (loginBy == "fb") {
      this.loginProvider = new firebase.auth.FacebookAuthProvider();
    } else if (loginBy == "github") {
      this.loginProvider = new firebase.auth.GithubAuthProvider();
    }

    return this.afAuth.auth.signInWithPopup(this.loginProvider);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
