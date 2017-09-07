import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {RestService} from '../../services/posts.service';
import { Observable } from 'rxjs/Rx';

@Component({
  providers: [RestService, Location],
  template:""
  
})
export class FbGraphService
{
    
// Local
    //  FBConnection_FB_APP_ID = '1864351513838558';
    //  FB_APP_SECRET = '5eaacaabd18b8b0dca9ea713d084228f'
// Server
    FBConnection_FB_APP_ID = '414379935593643';
    FB_APP_SECRET = '409f50ab89c987dbc8c02de70b2cb6b2';
    token: string;
    constructor(private restService: RestService, private location:Location){}
getToken(code: string)
    {
    console.log('service invoke.....');
    let url = "https://graph.facebook.com/oauth/access_token?"
					+ "client_id=" + this.FBConnection_FB_APP_ID + "&redirect_uri="+encodeURIComponent(location.protocol+"//" + location.host+"/login")+"%3Ftype%3Dfb"
					+ "&client_secret=" + this.FB_APP_SECRET + "&code=" + code;
    return this.restService.getFBRequest(url);
}

getFBGraph(accessToken: string)
    {
    console.log('service invoke.....');
    let url = "https://graph.facebook.com/me?fields=name,email,gender,location,first_name&access_token=" + accessToken;
    console.log(url);
    return this.restService.getFBRequest(url);
}



}


