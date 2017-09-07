import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl,FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RestService} from '../../services/posts.service';
import {Email}  from '../../services/sendemail.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../userdata/userModel.interface';

@Component({
  selector: 'enrollconfirm',
  templateUrl: './enrollconfirm.html',
  styles: ['.section-content {line-height: 1.7; font-size: 1.6rem;}'],
  providers: [ RestService, Email, FormBuilder, FormsModule, ReactiveFormsModule],
  
})
export class EnrollConfirmComponent { 

  public enrollConfirmform: FormGroup;
  public model:EnrollConfirmModel;

   public enrollconfirmform = this.fb.group({
    agreed: ["", Validators.required],
    
  });
  
  constructor(private router: Router,
       private fb: FormBuilder, 
       //private activatedRoute: ActivatedRoute,  
       public sendmail:Email,
  ) { }

  onSubmit(event) {
  console.log("EnrollConfirmComponent: "+this.enrollconfirmform.valid);
  if(this.enrollconfirmform.valid){
    let userModel:User = JSON.parse(localStorage.getItem('currentUserModel'));
    this.sendmail.send(userModel);
    localStorage.setItem('currentUserModel', null);
    this.router.navigate(['angularassignment']);
  }else{
    this.router.navigate(['/']);
  }
  
}


  
}

interface EnrollConfirmModel{
    agreed:string;
}