import {Injectable} from '@angular/core';
import {Http, Headers,  RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../components/userdata/userModel.interface';
import {RestService} from '../services/posts.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Injectable()
export class AddUserService{
    retrievedUser:User;
    success:boolean=false;
    constructor(private http: Http,
                private router: Router, 
                private restService: RestService){
        console.log('AddUserService initialized.........');
    }
    addUser(model:User): boolean{
        this.getUser(model).subscribe(user => {
            if(user.length>0){
                this.retrievedUser = user[0];
                if(this.retrievedUser!=null && this.retrievedUser.email!='')
                {
                    let ask =  confirm("Opps! You are already connected with us, do you want to update?")
                    if(ask)
                    {
                        this.updateUser(model, this.retrievedUser).subscribe(user => {
                            console.log(JSON.stringify(user))
                        },
                            error => {console.log(error)});
                    }
                }
            }
            else{
                this.saveUser(model).subscribe(user => {
                    console.log(JSON.stringify(user))
                },
                            error => {console.log(error)});
            }
             this.router.navigate(['enrollconfirm']);
         },
         error => {
             console.log(error)
             this.router.navigate(['enrollconfirm']);
            });
         
        //this.saveUser(model).subscribe(user => {console.log()},
         //   error => {console.log(error)});
        console.log("AdduserService: addUser in process");
        console.log(model.email+":"+model.fname+":"+model.cname+":"+model.city1+":"+model.area1);
        return this.success=true;

    }

    saveUser(model:User){
        let headers = new Headers({ 'dochk':this.restService.doChk, 
                                 'Content-Type': 'application/json',
                                 'Access-Control-Allow-Origin': '*', 
                                 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
        let options = new RequestOptions({ headers: headers });
        
        return this.restService.postRequest('https://pezitrrestapi.herokuapp.com/api/users', JSON.stringify(model), options);
        // return this.restService.postRequest('http://localhost:3000/api/users', JSON.stringify(model), options);

    }
    updateUser(model:User, retrieved:User){
        let headers = new Headers({ 'dochk':this.restService.doChk, 'Content-Type': 'application/json',
                                 'Access-Control-Allow-Origin': '*', 
                                 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
        let options = new RequestOptions({ headers: headers });
        return this.restService.putRequest('https://pezitrrestapi.herokuapp.com/api/users/'+retrieved._id, JSON.stringify(model), options);
        // return this.restService.putRequest('http://localhost:3000/api/users/'+retrieved._id, JSON.stringify(model), options);

    }
    getUser(model:User){
        let headers = new Headers({ 'dochk':this.restService.doChk, 
                                 'Content-Type': 'application/json',
                                 'Access-Control-Allow-Origin': '*', 
                                 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
        let options = new RequestOptions({ headers: headers });
        return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/users?email='+model.email);
        // return this.restService.getRequest('http://localhost:3000/api/users?email='+model.email);

    }

    getUsers(){
        console.log("getUsers service invoking");
        let headers = new Headers({ 'dochk':this.restService.doChk, 
                                 'Access-Control-Allow-Origin': '*', 
                                 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',
                                  });
        let options = new RequestOptions({ headers: headers });
        return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/users');
        // return this.restService.getRequest('http://localhost:3000/api/users?email='+model.email);

    }

}