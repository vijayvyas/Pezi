import {Injectable} from '@angular/core';
import {Http, Headers,  RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {LookingForModel} from './lookingforModel.interface';
import {RestService} from '../../services/posts.service';

@Injectable()
export class LookingForService{
    retrievedUser:LookingForModel;
    success:boolean=false;
    constructor(private restService: RestService){
        console.log('LookingForService initialized.........');
    }
   
    addUser(model:LookingForModel): boolean{
        this.saveUser(model).subscribe(user => {
                    console.log(JSON.stringify(user))
                },
                            error => {console.log(error)});
         
        //this.saveUser(model).subscribe(user => {console.log()},
         //   error => {console.log(error)});
        console.log("AdduserService: addUser in process");
        //console.log(model.email+":"+model.fname+":"+model.mobileno+":"+model.techname1+":"+model.othertechName);
        return this.success=true;

    }

    saveUser(model:LookingForModel){
        let headers = new Headers({ 'dochk':this.restService.doChk, 
                                 'Content-Type': 'application/json',
                                 'Access-Control-Allow-Origin': '*', 
                                 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
        let options = new RequestOptions({ headers: headers });
        
        return this.restService.postRequest('https://pezitrrestapi.herokuapp.com/api/techrequests', JSON.stringify(model), options);
        // return this.restService.postRequest('http://localhost:3000/api/techrequests', JSON.stringify(model), options);

    }
    // updateUser(model:LookingForModel, retrieved:LookingForModel){
    //     let headers = new Headers({ 'Content-Type': 'application/json',
    //                              'Access-Control-Allow-Origin': '*', 
    //                              'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.restService.putRequest('https://pezitrrestapi.herokuapp.com/api/users/'+retrieved._id, JSON.stringify(model), options);
    //     // return this.restService.putRequest('http://localhost:3000/api/users/'+retrieved._id, JSON.stringify(model), options);

    // }
    // getUser(model:LookingForModel){
    //     let headers = new Headers({ 'Content-Type': 'application/json',
    //                              'Access-Control-Allow-Origin': '*', 
    //                              'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/users?email='+model.email);
    //     // return this.restService.getRequest('http://localhost:3000/api/users?email='+model.email);

    // }

}