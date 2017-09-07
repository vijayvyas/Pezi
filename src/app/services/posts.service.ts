import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RestService{
    public doChk='XuxmSQfAU4JWGPkCA5gr';
    constructor(private http: Http){
        console.log('Post Service Initialized.....');
    }

    getRequest(url:string){
        console.log("--------RestFul service about to invoke....");
        let headers = new Headers({ 'dochk':this.doChk, 'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin'
     });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(res => res.json());
      
    //    return this.http.get(url, options).map(res =>
    //     {
    //         console.log("--------RestFul service in progress....");
    //                 if(res.status < 200 || res.status >= 300) {
    //                     throw new Error('This request has failed ' + res.status);
    //                 } 
    //                 else{
    //                     res.json();
    //                 }   
    //     });
        // return resp;
    }

getFBRequest(url:string){
        console.log("--------RestFul service about to invoke....");
        return this.http.get(url).map(res => res.json());

    }

    getRequestWithoutJSON(url:string){
        console.log("--------RestFul service about to invoke....");
        return this.http.get(url).map(res => res.text());
      
    //    return this.http.get(url, options).map(res =>
    //     {
    //         console.log("--------RestFul service in progress....");
    //                 if(res.status < 200 || res.status >= 300) {
    //                     throw new Error('This request has failed ' + res.status);
    //                 } 
    //                 else{
    //                     res.json();
    //                 }   
    //     });
        // return resp;
    }
    
    postRequest(url:string, body:string, options: RequestOptions){
        //return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json());
        return this.http.post(url,body, options).map(res =>
        {
            console.log("--------RestFul service in progress....");
                    if(res.status < 200 || res.status >= 300) {
                        throw new Error('This request has failed ' + res.status);
                    } 
                    else{
                        res.json();
                    }   
        });
    }

      putRequest(url:string, body:string, options: RequestOptions){
        //return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json());
        return this.http.put(url,body, options).map(res =>
        {
            console.log("--------RestFul service in progress....");
                    if(res.status < 200 || res.status >= 300) {
                        throw new Error('This request has failed ' + res.status);
                    } 
                    else{
                        res.json();
                    }   
        });
    }

    postRequestWithoutJSON(url:string, body:string, options: RequestOptions){
        //return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json());
        return this.http.post(url, body, options).map(res =>
        {
            console.log("--------RestFul service in progress....");
                    if(res.status < 200 || res.status >= 300) {
                        throw new Error('This request has failed ' + res.status);
                    } 
                    else{
                        res.text();
                    }   
        });
    }


    handleError (error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `OOH! There was a problem with our service and we couldn't retrieve your data!`
    console.log(errorMsg);
    // throw an application level error
    return Observable.throw(errorMsg);
    }
}