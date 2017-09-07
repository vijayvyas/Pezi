import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { SubrouteComponent } from './subroute/subroute.component';

import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { Navbar } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { TrainingLocComponent } from './components/training-location/training-location.component';
import { RoadMapComponent } from './components/roadmap/roadmap.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AngularCources } from './components/angularAssignment/angularassignment.component';
import { VisitDataComponent } from './components/visitdata/data.component';
import { BusinessModelComponent } from './components/businessmodel/businessmodel.component';
import { ContactUsComponent } from './components/contactus/contactus.component';
import { AboutComponent } from './components/about/about.component';
import { PhotogalleryComponent } from './components/photogallery/photogallery.component';
import { VideogalleryComponent } from './components/videogallery/videogallery.component';
import { ErrorComponent } from './components/error.component';
import { UserComponent } from './components/user/user.component';
import { AddUserDetails } from './components/userdata/adduserdetails.component';
import { UserLogin } from './components/login/login.component';
import { ControlMessagesComponent } from "./components/common/control-messages.component";

import { CustExtBrowserXhr } from "./services/custExtBrowserXhr.service";
import { ValidationService } from "./services/validation.service";
import { DataService } from "./components/visitdata/data.service";
import { GitGraphService } from "./services/login/git.service";
import { FbGraphService } from "./services/login/fbgraph.service";
import { AuthService } from './services/login/auth.service';
import { LookingFor } from './components/lookingFor/lookingfor.component';
import { EnrollConfirmComponent } from './components/enrollconfirm/enrollconfirm.component';
import { RegistereduserComponent } from './components/registereduser/registereduser.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab/courses-tab.component';



export const firebaseConfig = {
    apiKey: "AIzaSyC1F0u3pp-2RF7OWw04mmZKMN6Oh1xMdt8",
    authDomain: "pezitrweb.firebaseapp.com",
    databaseURL: "https://pezitrweb.firebaseio.com",
    projectId: "pezitrweb",
    storageBucket: "pezitrweb.appspot.com",
    messagingSenderId: "11778639756"
    /*apiKey: "AIzaSyDQxzG-tQnLqNUjEOkJj4hU6NTRYMy-IEc",
    authDomain: "pezitr-163717.firebaseapp.com",
    databaseURL: "https://pezitr-163717.firebaseio.com",
    projectId: "pezitr-163717",
    storageBucket: "pezitr-163717.appspot.com",
    messagingSenderId: "114863431271"*/
};


@NgModule({
  declarations: [
    AppComponent,
    SubrouteComponent,
    Navbar,
    HomeComponent,
    SliderComponent,
    RoadMapComponent,
    TrainingLocComponent,
    CoursesComponent,
    AngularCources,
    VisitDataComponent,
    BusinessModelComponent,
    ContactUsComponent,
    AboutComponent,
    ErrorComponent,
    UserComponent,
    AddUserDetails,
    UserLogin,
    ControlMessagesComponent,
    GitGraphService,
    FbGraphService,
    // AuthService,
    DataService,
    LookingFor,
    EnrollConfirmComponent,
    RegistereduserComponent,
    PhotogalleryComponent,
    VideogalleryComponent,
    CoursesTabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1F0u3pp-2RF7OWw04mmZKMN6Oh1xMdt8'
    })
  ],
  providers: [ValidationService],
  //providers: [{provide: BrowserXhr, useClass: CustExtBrowserXhr},ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
