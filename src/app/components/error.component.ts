import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'error',
  templateUrl: './html/error.html'
  // template: `
  //           <h3>About this app</h3> 
  //           <p>This page is Under Construction.......</p>`,
})
export class ErrorComponent  { 

constructor(private router: Router) { }
    onSubmit(event){
        console.log("error page navigating to ");
        this.router.navigate(['/']);
    }
  
}