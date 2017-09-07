import { Component } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import {FbGraphService} from '../../services/login/fbgraph.service';
import {RestService} from './../../services/posts.service';
import {UserLogin} from '../login/login.component';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'angular-assignment',
  templateUrl: './angularassignment.html',
   styleUrls: ['./angularAssign.css'],
  providers:[AuthService, UserLogin, FbGraphService, RestService, AngularFireAuth]
  // template: `
  //           <h3>About this app</h3> 
  //           <p>This page is Under Construction.......</p>`,
})
export class AngularCources  { 


  isLoggedIn: Boolean;
  displaysteps="none";
  displaylogin= "block";
  user_displayName: String;
  constructor(public authService: AuthService, private userLogin: UserLogin) {
    this.loginCheck();
  }


  displayLogin(){
    this.userLogin.displayLogin();
  }
    login(loginBy: string) {    
    this.userLogin.login(loginBy)
     .then(data => {
       this.isLoggedIn = true;;
      }, (error) => {
        alert(error.message);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  loginCheck(){
    this.authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.displaysteps= "none";
          this.displaylogin="block";
        } else {
          this.isLoggedIn = true;
          document.getElementById('id01').style.display = 'none';
          this.user_displayName = auth.displayName;
          this.displaysteps= "block";
          this.displaylogin=  "none";
        }
      }
    );

  }
  gitlogin(){
    this.authService.loginWith("github")
      .then(data => {
          // this.loginCheck();
      }, (error) => {
        alert(error.message);
      })
      .catch(error => {
        alert(error.message);
      });
  }
  
}