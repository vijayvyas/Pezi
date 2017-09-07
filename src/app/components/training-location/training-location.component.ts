import { Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Component({
  selector: 'training-loc',
  templateUrl: './training-location.html',
  styles: [".sebm-google-map-container { height: 300px;}"]
  })
export class TrainingLocComponent { 


  lat1: number = 18.5936695;
  lng1: number = 73.7927492;

  kharadilat2: number = 18.5522467;
  kharadilng2: number = 73.9439623;

}
