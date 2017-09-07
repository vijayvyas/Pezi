import { Component } from '@angular/core';
import {RestService} from '../../services/posts.service';
import {Http, Headers, RequestOptions} from '@angular/http';


@Component({
  providers: [RestService],
  template:""
  
})
export class GitGraphService
{
    APP_ID = 'f50acc1ab6b21902b69f';
    APP_SECRET = '17db7d61ecd892d2244bbe4bbc50868e01bcb8ab';
    redirect_uri = encodeURIComponent(location.protocol+"//" + location.host+"/login");

    constructor(private restService: RestService){}
    getToken(code: string)
    {
        console.log('service invoke.....');
        let url = "https://github.com/login/oauth/access_token";
        var body = 'client_id='+this.APP_ID+'&client_secret='+this.APP_SECRET+'&code='+code+'&redirect_uri='+this.redirect_uri+'&state=BcpvL1TygyfyjeGPyP74ZFu5GAgIkH7tI1GBlinn';
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',  });
        let options = new RequestOptions({ headers: headers });
        return this.restService.postRequestWithoutJSON(url, body, options);
    }

getGraph(accessToken: string)
    {
    console.log('service invoke.....');
    let url = "https://api.github.com/user&" + accessToken;
    console.log(url);
    return this.restService.getRequest(url);
    }
}
