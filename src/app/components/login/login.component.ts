import { Component } from "@angular/core"
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FbGraphService } from '../../services/login/fbgraph.service';
import { RestService } from '../../services/posts.service';
import { AuthService } from '../../services/login/auth.service';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: ['.body {background-color: #969696;}'],
  providers: [FbGraphService, RestService, AuthService, AngularFireAuth]
})
export class UserLogin {
  tokenSize = 0;
  ltype: string;
  user: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fbGraphService: FbGraphService,
    private authService: AuthService
  ) { }


  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   let code: string = params['code'];
    //   let type: string = params['type'];
    //   if (!(code == null || code == undefined)) {
    //     this.router.navigate(['/adduserdetails'], { queryParams: { 'ltype': type, 'user': code } });
    //     // this.postValue(code, type);
    //   }
    // });
    // this.postValue();
  }

  displayLogin() {

    this.authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          // this.router.navigate(['']);
          if(document.getElementById('id01')!=null)
          {
                      document.getElementById('id01').style.display = 'block';
          }
        }
        else {
          console.log("Logged in");
          //   console.log(auth);
         
        }
      }
    );
 return this.authService.afAuth.authState;
    //     //   console.log(encodeURIComponent(location.protocol+"//" + location.host+"/login/"));
    //      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //       console.log("currentUser"+currentUser);
    //     if(currentUser!=null)
    //     {
    //         console.log("currentUser.token"+currentUser.token);
    //         this.fbGraphService.getFBGraph(currentUser.token).subscribe(posts => {
    //             console.log(JSON.stringify(posts));
    //      }, error => 
    //        {    
    //            document.getElementById('id01').style.display='block';
    //         },
    //            ()=> {
    //          window.location.href='http://www.facebook.com/dialog/oauth?client_id='+this.fbGraphService.FBConnection_FB_APP_ID+'&redirect_uri='+encodeURIComponent(location.protocol+"//" + location.host+"/login")+'%3Ftype%3Dfb';
    //         //  document.getElementById('course1').setAttribute("href", 'http://www.facebook.com/dialog/oauth?client_id=1273622235983404&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin%3Ftype%3Dfb');
    //        });
    // // /adduserdetails
    //     }
    //     else{
    //         document.getElementById('id01').style.display='block';
    //     }
  }

  // postValue(token: string, type: string) {
  //     this.ltype = type;
  //      this.user = token;
  //     this.router.navigate(['/adduserdetails'], { queryParams: { 'ltype': this.ltype, 'user': this.user }});
  //    /* opener.document.userfm.action = '/adduserdetails';
  //     opener.document.userfm.submit();*/
  //     // this.restService.getRequest('http://localhost:2222/login');
  //      self.close();
  // }

  // loginsubs(loginBy: string): Observable<string> {

  //   this.authService.loginWith(loginBy)
  //     .then((data) => {
  //       this.router.navigate(['adduserdetails']);
  //     }, (error) => {
  //       alert("1" + error);
  //     })
  //     .catch(error => {
  //       alert(error.message);
  //     });
  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       observer.next("vijay");
  //     }, 1000);
  //     setTimeout(() => {
  //       observer.complete();
  //     }, 1000);
  //   });

  // }

  login(loginBy: string) {
return this.authService.loginWith(loginBy);
      // this.router.navigate(['adduserdetails']);
    // this.loginsubs(loginBy).subscribe(data => {
    //   console.log("subscribe");
    // });
  }
}
