import { Component } from '@angular/core';
import {FbGraphService} from '../../services/login/fbgraph.service';
import {RestService} from './../../services/posts.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserLogin} from '../login/login.component';
import { AuthService } from '../../services/login/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'courses',
  templateUrl: './courses.html',
  styleUrls: ['./course.css'],
  providers: [FbGraphService, RestService, UserLogin, AuthService, AngularFireAuth]
  
})
export class CoursesComponent  { 
  constructor(private fbGraphService: FbGraphService, private router: Router,private userLogin: UserLogin){}
  fburi= "";
  gituri = "";
  ngOnInit(){
      this.fburi = "http://www.facebook.com/dialog/oauth?client_id="+this.fbGraphService.FBConnection_FB_APP_ID+"&redirect_uri="+encodeURIComponent(location.protocol+"//" + location.host+"/login")+"%3Ftype%3Dfb";
      this.gituri = "https://github.com/login/oauth/authorize?scope=user%3Aemail&state=BcpvL1TygyfyjeGPyP74ZFu5GAgIkH7tI1GBlinn&redirect_uri="+encodeURIComponent(location.protocol+"//" + location.host+"/login")+"%3Ftype%3Dgit&client_id=f50acc1ab6b21902b69f";
 }
  
      
  displayLogin(){
    
    let loggedin  = this.userLogin.displayLogin()
    .subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          this.router.navigate(['']);
          if(document.getElementById('id01')!=null)
          {
                      document.getElementById('id01').style.display = 'block';
          }
        }
        else {
          console.log("Logged in");
          //   console.log(auth);
         this.router.navigate(['/adduserdetails']);
        }
      }
    );
}
  
  login(loginBy: string) {    
    this.userLogin.login(loginBy)
     .then(data => {
        this.router.navigate(['/adduserdetails']);
      }, (error) => {
        alert(error.message);
      })
      .catch(error => {
        alert(error.message);
      });
  }
  get appId(): string
  {
    return this.fbGraphService.FBConnection_FB_APP_ID;
  }
}
