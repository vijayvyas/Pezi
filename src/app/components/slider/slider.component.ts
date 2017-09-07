import { Component, ViewChild } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component'
import {FbGraphService} from '../../services/login/fbgraph.service';
import {RestService} from '../../services/posts.service';
import {UserLogin} from '../login/login.component';
import {AuthService} from '../../services/login/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
 selector: 'my-slider',
 templateUrl: './slider.html',
//  styleUrls: ['../../../assets/css/header.css'],
 styleUrls: ['./slider.component.css'],
 providers:[CoursesComponent,FbGraphService, RestService, UserLogin, AuthService, AngularFireAuth]
  
})
export class SliderComponent  { 
  constructor(private userLogin: UserLogin)
  {
     
  }
  /*ngOnInit()
  {
    $('.carousel')
            .carousel({
            interval: 5000 //changes the speed
        })
  }*/
  displayLogin()
  {
    this.userLogin.displayLogin();
  }
  
}