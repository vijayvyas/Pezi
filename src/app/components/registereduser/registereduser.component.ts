import {OnInit, Component } from '@angular/core';
import {Router} from '@angular/router';
import {AddUserService} from '../../services/adduser.service';
import { User } from '../userdata/userModel.interface';
import {RestService} from '../../services/posts.service';
import {Email}  from '../../services/sendemail.service';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl,FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'registereduser',
  templateUrl: './registereduser.html',
  providers:[AddUserService,RestService,FormBuilder,Email],
  styles: ["body {text-align: left;}"]
})
export class RegistereduserComponent implements OnInit { 

users:User[] = [];
public registereduserlistform: FormGroup;
usersSelect:User[] = [];

    private emailService:Email;
    successFlag:boolean=false; 

    constructor(private router: Router, private addUserService:AddUserService, private fb: FormBuilder, tempemailService:Email) {
        this.emailService=tempemailService;
     }

    ngOnInit(){
        this.getUsers();
        /*this.registereduserlistform= this.fb.group({
        checked:['',Validators.required],
        name:['',]
        });*/
    }

    getUsers(){
       return this.addUserService.getUsers().subscribe(users=>{
                this.users =  users;
                // this.users =  users.filter(user=>!user.inneruser);   
         
       })
    }

    public set selectAll(value){
    this.users.forEach((user, index) => {
      user.checked = value;
    });
    // this._selectAll = value;
  }

    /*delete(event){
        console.log("sendmail che " + event.forms);
        //this.router.navigate(['registereduser']);
    }*/

    sendmail(){
        console.log("sendmail sendmail "+this.usersSelect);
        this.users.filter(user=>user.checked)
                  .forEach((emailuser)=> {
                      console.log(JSON.stringify(emailuser));
                      this.successFlag=this.emailService.registerUserSend(emailuser);
                  }, this);
                  console.log("successFlag "+this.successFlag);
       
        
        /*const control =this.registereduserlistform.controls['checked'];
         console.log("sendmail" + control);*/

    }
    getLocation(area1: number)
    {
        return AREA[area1-1].name;
    }
//     updateCheckedOptions(chuser, event) {
        
//      var cbIdx = this.usersSelect.indexOf(chuser);
//       if(event.target.checked) {
//           if(cbIdx < 0 )
//             this.usersSelect.push(chuser);
//       } else {
//           if(cbIdx >= 0 )
//             this.usersSelect.splice(cbIdx,1);
//       }
//   }
    

    
    
   
  
}

class Area {
  constructor(public id: number, public name: string) { }
}

export const AREA: Area[] = [
  new Area(1, 'Magarpatta')
  , new Area(2, 'Kharadi')
  , new Area(3, 'Viman Nagar')
  , new Area(4, 'Aundh')
  , new Area(5, 'Hinjewadi')
  ];