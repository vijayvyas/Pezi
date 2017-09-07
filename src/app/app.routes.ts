import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubrouteComponent } from './subroute/subroute.component';

import { AboutComponent }  from './components/about/about.component';
import { ErrorComponent }  from './components/error.component';
import { UserComponent }  from './components/user/user.component';
import { AddUserDetails }  from './components/userdata/adduserdetails.component';
import { UserLogin }  from './components/login/login.component';
import { LookingFor } from './components/lookingFor/lookingfor.component';
import { EnrollConfirmComponent } from './components/enrollconfirm/enrollconfirm.component';
import { AngularCources } from './components/angularAssignment/angularassignment.component';
import { RegistereduserComponent } from './components/registereduser/registereduser.component';
import { PhotogalleryComponent }  from './components/photogallery/photogallery.component';
import { VideogalleryComponent }  from './components/videogallery/videogallery.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab/courses-tab.component';



export const ROUTES: Routes = [
  { path: '', 			component: HomeComponent },
  { path: 'subroute', 	component: SubrouteComponent },
  { path: 'photogallery',		component: PhotogalleryComponent},
  { path: 'videogallery',		component: VideogalleryComponent},
  { path: 'about',		component: AboutComponent},
  { path: 'login',		component: UserLogin },
  { path: 'lookingfor',component: LookingFor},
  { path: 'error', component: ErrorComponent},
  { path: 'enrollconfirm',component: EnrollConfirmComponent},
  { path: 'angularassignment',component: AngularCources},
  { path: 'adduserdetails',component: AddUserDetails},
  { path: 'registereduser',component: RegistereduserComponent},
  { path: 'courses',component: CoursesTabComponent}
];
