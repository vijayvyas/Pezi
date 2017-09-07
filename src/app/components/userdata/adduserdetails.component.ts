
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl,FormsModule, ReactiveFormsModule} from '@angular/forms'
import { User } from './userModel.interface';
import {AddUserService} from '../../services/adduser.service';
import {SelectModule} from "angular2-select";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {RestService} from '../../services/posts.service';
import {FbGraphService} from '../../services/login/fbgraph.service';
import {GitGraphService} from '../../services/login/git.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';
import {Email}  from '../../services/sendemail.service';
import {ValidationService} from "../../services/validation.service";
import {UserLogin} from '../login/login.component';
import { AuthService } from '../../services/login/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  moduleId: module.id,
  selector: 'adduserdetails',
  templateUrl: './adduserdetails.html',
  styleUrls: ['./adduserdata.css'],
  providers: [AddUserService, 
    FbGraphService, 
    RestService, 
    GitGraphService, 
    Email, 
    FormBuilder, 
    FormsModule, 
    ReactiveFormsModule,
    AuthService, 
    AngularFireAuth,
    UserLogin],
  styles: [
    'input.ng-invalid {border-left:2px solid red;} input.ng-valid {border-left:2px solid green;}',
    'Select.ng-invalid {border-left:2px solid red;} Select.ng-valid {border-left:2px solid green;}',
  ]
})
export class AddUserDetails implements OnInit {

  public userForm: FormGroup;
  public details: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public areaobj: any[];
  
  successFlag:boolean;
  token: string;
  userModel: User;
  emailId:string;
  user_displayName:string;
  private isLoggedIn: Boolean;
  
  constructor(private router: Router,
       private _formBuilder: FormBuilder, 
       private useraddservice: AddUserService, 
       private activatedRoute: ActivatedRoute,  
       private fbGraphService: FbGraphService, 
       private gitGraphService: GitGraphService, 
       public sendmail:Email,
       private authService: AuthService,
       private userLogin: UserLogin) {
    this.authService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.emailId = '';
          this.router.navigate(['']);
        } 
        else {
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.emailId = auth.email;
          console.log("Logged in");
          console.log(auth);
          // this.router.navigate(['']);
        }
      }
    );


        }

  /*implement: FormBuilder */
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser!=null)
    {
          // this.token = currentUser.token; // your token
    }
    this.userForm = this._formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      fname: ['', [Validators.pattern("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+"), Validators.minLength(4), Validators.maxLength(50)]],
      mobileno: ['', [Validators.pattern("^[789]\\d{9}$"), Validators.minLength(10), Validators.maxLength(10)]],
      cname: ['', [Validators.pattern("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+"), Validators.minLength(4), Validators.maxLength(50)]],
      city1: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      area1: ['', [Validators.required]],
      
      ques1: this._formBuilder.group({
        chckbox_perl:['',],
        chckbox_javascript:['',],
        chckbox_php:['',],
        chckbox_go:['', ],
        chckbox_c:['', ],
        chckbox_unix:['', ],
        chckbox_scala:['', ],
        chckbox_python:['',],
        chckbox_objectC:['',],
        chckbox_ruby:['', ],
        chckbox_java:['', ],
        chckbox_chash:['',],
        otherText:['', ],
      }),
       ques2: this._formBuilder.group({
        oop_redio1:['', ],
        java_redio1:['', ],
        cdevel_redio1:['', ],
        javaSc_redio1:['', ],
        htmlcss_redio1:['', ],
      }),
      ques3: this._formBuilder.group({
        ques3TextArea:['',],
      })
      
      
    });

    // subscribe to form changes  
    this.subcribeToFormChanges();
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //     let ltype : string = params['ltype'];
    //     let user : string = params['user'];
    //     if(ltype == 'fb')
    //     {  
    //       if(!(user==null || user == undefined))
    //       {  
    //         let posts = this.getTokenWpr(user)
          
    //       }
    //     }
    //   });
  }

getTokenWpr(user : string)
 {
   if(this.token==null || this.token==""){
     console.log("if");
   console.log('service subscribed.....');
            this.fbGraphService.getToken(user).subscribe(posts => {
               console.log('post               :'+posts);
               this.token = posts.access_token;
                this.getGraphData(posts.access_token);
                localStorage.setItem('currentUser', JSON.stringify({ token: posts.access_token, name: name }));
       }, error => {
         console.log('error receieved while geting token :'+error)
         this.userLogin.displayLogin();
       });
   }
   else{
     console.log("else"+this.token);
      this.getGraphData(this.token);
   }
 }

getGraphData(tokenAttr : string)
 {
   console.log('service subscribed.....');
            return this.fbGraphService.getFBGraph(tokenAttr).subscribe(posts => {
               console.log('Graph                :'+JSON.stringify(posts));
               this.userModel = posts;
               this.emailId = this.userModel.email;
               this.user_displayName = this.userModel.name;
       }, error => this.sendForLogin(error));

 }
sendForLogin(error:string){
  console.log('error receieved during user information retrival :'+error)
  localStorage.setItem('currentUser', null);
  this.router.navigate(['/']);
}

  subcribeToFormChanges() {
    const myFormStatusChanges$ = this.userForm.statusChanges;
    const myFormValueChanges$ = this.userForm.valueChanges;

    myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
    myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
  }


  onSubmit(model: User, isValid: boolean) {
    this.submitted = true;
    console.log("model"+JSON.stringify(model));
    console.log("Model Object: Exp : "+model.experience+" City: "+ model.city1+" Area: "+ model.area1);
    console.log("Model Object: Checkbox : "+model.ques1.chckbox_perl+"===== Redio Button: "+ model.ques2.oop_redio1);
    localStorage.setItem('currentUserModel', JSON.stringify(model));
    this.successFlag=this.useraddservice.addUser(model);
   
    //this.sendmail.send(model);
    console.log("Flag: " + this.successFlag);
  }

  

  onSelect(cityid: number) {
    if (cityid == 1) {
      this.areaobj = [ new Area(1, 'Magarpatta'), new Area(2, 'Kharadi'), new Area(3, 'Viman Nagar'), new Area(4, 'Aundh'), new Area(5, 'Hinjewadi')];
    }
    if (cityid == 2) {
      this.areaobj = [new Area(1, 'Dadar'), new Area(2, 'Borivali'), new Area(3, 'Belapur'), new Area(3, 'Vashi')];
    }
    if (cityid == 3) {
      this.areaobj = [new Area(1, 'Harsul'), new Area(2, 'MG Road'),];
    }

  }

  expobj = [
    //new Experience(0, 'Select'), 
    new Experience(1, '0 To 2'), new Experience(2, '2 To 4'), new Experience(3, '4 To 6'), new Experience(4, '6 and above')
  ];

  cityobj = [
    //new City(0, 'Select'), 
    // new City(1, 'Pune'), new City(2, 'Mumbai'), new City(3, 'Banglore')
    new City(1, 'Pune')
  ];

  techobj = [
    //new Tech(0, 'Select'), 
    new Tech(1, 'Beginner'), new Tech(2, 'Inermidate'), new Tech(3, 'Expert')
  ];

  nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
  let re = /r /;
  if (control.value && control.value.match(re)) {
    return { nospace: true };
  }
}

}


class Tech {
  constructor(public id: number, public name: string) { }
}
class City {
  constructor(public id: number, public name: string) { }
}
class Area {
  constructor(public id: number, public name: string) { }
}
class Experience {
  constructor(public id: number, public name: string) { }
}


