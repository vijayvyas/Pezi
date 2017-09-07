import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/login/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'nav-bar',
 templateUrl: './navbar.html',
 styleUrls: ['./navbar.component.css'],
 providers:[AuthService, AngularFireAuth]
  

})
export class Navbar
{
  isLoggedIn: Boolean;
  user_displayName: String;
  constructor(public authService: AuthService) {
    this.authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
        } else {
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
        }
      }
    );
  }
  logout()
  {
    this.authService.logout();
  }
  
}
