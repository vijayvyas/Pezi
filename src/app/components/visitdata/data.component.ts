import { Component } from '@angular/core';
import { DataService} from './data.service'
import {RestService} from '../../services/posts.service';
import {DataModel} from '../../components/visitdata/data.model';

@Component({
  selector: 'visit-data',
  // template:`hello {{candidate}}`,
  templateUrl: './data.html',
  styleUrls: ['./data.component.css'],
  providers:[DataService, RestService, DataModel]
})

export class VisitDataComponent  { 
  candidate:number= 200;
  candidateApplied:number[];
  classes: Number = 4;
  developers: Number=32;
  companies: Number=5;
  countObj: Count;
constructor(dataService: DataService)
{
  dataService.getCandidate().subscribe(posts => {
         this.candidateApplied = posts;
        this.candidate = 200+this.candidateApplied.length;
       },()=>this.candidate=200);
  dataService.getCourses().subscribe(posts => {
         this.countObj = posts;
        this.classes = this.countObj[0].count;
       },()=>this.classes=3);
  dataService.getEnrollment().subscribe(posts => {
    this.countObj = posts;
    this.developers = this.countObj[0].count;
  },()=>this.candidate=200);
  dataService.getCompanies().subscribe(posts => {
    this.countObj = posts;
    this.companies = this.countObj[0].count;
  },()=>this.candidate=200);
  // this.developers=dataService.getVisitData()[2];
  // this.companies=dataService.getVisitData()[3];
  console.log('VisitDataComponent Initialized.....');
}
}
interface Count{
  count : number;
}

interface User {
  _id:string;
  email: string;
}

