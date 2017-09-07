import { Component } from '@angular/core';
import {RestService} from '../../services/posts.service';

@Component({
  moduleId: module.id,
  selector: 'mailing',
  templateUrl: 'user.component.html',
  providers: [RestService]
})
export class UserComponent  { 
  fname: string;
  lname: string;
  email: string;  
  address: address;
  company: string;
  hobbies: string[]
  showHobbies: boolean;
  posts: Post[];

  constructor(private postService: RestService){
  this.fname = 'Pezitr'; 
  this.lname = 'Pune'; 
  this.email = 'admin@pezitr.com';  
  this.address ={
    street : 'Pune',
    city : ' Pune',
    state : ' MH'
  }
  this.company= 'Pezitr';
  this.hobbies =['Music', 'Movies', 'Sports'];
  this.showHobbies=false;
  //this.postService.getPosts().subscribe(posts =>{
    ///this.posts = posts;
  //});
 }

 hideHobbies(){
   if(this.showHobbies==true){
      this.showHobbies=false;
   }else{  this.showHobbies=true;  }
 }
 

}

interface address{
  street : string;
  city : string;
  state : string;
}

interface Post{
  id : number;
  title : string;
  body : string;
}