
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl,FormsModule, ReactiveFormsModule} from '@angular/forms'
import {LookingForModel} from './lookingforModel.interface';
import {SelectModule} from "angular2-select";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {RestService} from '../../services/posts.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';
import {Email}  from '../../services/sendemail.service';
import {ValidationService} from "../../services/validation.service";
// import {UserLogin} from '../login/login.component';
import {LookingForService} from './lookingfor.service';


@Component({
  moduleId: module.id,
  selector: 'lookingfor',
  templateUrl: './lookingfor.html',
  providers: [LookingForService, RestService, Email, FormBuilder, FormsModule, ReactiveFormsModule],
  styles: [
    'input.ng-invalid {border-left:2px solid red;} input.ng-valid {border-left:2px solid green;}',
    'Select.ng-invalid {border-left:2px solid red;} Select.ng-valid {border-left:2px solid green;}',
    'textarea.ng-invalid {border-left:2px solid red;} textarea.ng-valid {border-left:2px solid green;}',
  ]
})
export class LookingFor implements OnInit {

  public lookingforForm: FormGroup;
  public details: FormGroup;
  public submitted: boolean=true;
  public events: any[] = [];
  public areaobj: any[];
  
  hideFlag:boolean;
  successFlag:boolean=false;
  token: string;
  userModel: LookingFor;
  emailId:string;
  userName:string;
  
  
  constructor(private router: Router,
       private _formBuilder: FormBuilder, 
       private lookingforservice: LookingForService, 
       private activatedRoute: ActivatedRoute,  
       public sendmail:Email,
      ) { }

  /*implement: FormBuilder */
  ngOnInit() {
      
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser!=null)
    {
          // this.token = currentUser.token; // your token
    }
    this.lookingforForm = this._formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      fname: ['', [Validators.pattern("^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+"), Validators.minLength(4), Validators.maxLength(50)]],
      mobileno: ['', [Validators.pattern("^[789]\\d{9}$"), Validators.minLength(10), Validators.maxLength(10)]],
      experience: ['', [Validators.required]],
      techname: ['', [Validators.required]],
      othertechName: ['',],
      
    });

    
  }

  onSubmit(model: LookingForModel, isValid: boolean) {
    console.log(model.othertechName);
    this.submitted = true;
    console.log("LookingForModel: "+JSON.stringify(model));
    
    
    this.successFlag=this.lookingforservice.addUser(model);
    //this.sendmail.send(model);
    console.log("Flag: " + this.successFlag);
  }

  onSelect(technameid: number) {
   
    if(technameid==4){
        this.hideFlag=true;
    }else{
        this.hideFlag=false;
        
    }
  }
 
  expobj = [
      new Experience(1, '0 To 2'), new Experience(2, '2 To 4'), new Experience(3, '4 To 6')
  ];

 
  technameobj = [
      new TechName(1, 'Testing Automation'), new TechName(2, 'Android'), new TechName(3, 'Ruby on Rails'),new TechName(4, 'Other')
  ];

  

  nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
  let re = /r /;
  if (control.value && control.value.match(re)) {
    return { nospace: true };
  }
}

}

class TechName {
  constructor(public id: number, public name: string) { }
}
class Experience {
  constructor(public id: number, public name: string) { }
}


