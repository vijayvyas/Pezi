import { Http } from '@angular/http'
import {RestService} from '../../services/posts.service';
import {DataModel} from '../../components/visitdata/data.model';
import { Component } from '@angular/core';
import {mongoose, mongojs} from 'mongoose'

@Component({
  providers: [RestService, DataModel],
  template:""
  
})
export class DataService
{
constructor(private restService: RestService, private dataModel: DataModel)
{
    console.log('DataService Initialized.....');
}
getCandidate()
{
    console.log('service invoke.....');
    
    
    // return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/candidateCnt');
    return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/users');
    //  return this.restService.getRequest('http://localhost:8080/api/users');
}

getCourses()
    {
    return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/courseCnt');
    // return this.restService.getRequest('http://localhost:8080/api/courseCnt');
}
getEnrollment()
    {
    return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/enrollCnt');
    // return this.restService.getRequest('http://localhost:8080/api/enrollCnt');
    }
getCompanies()
{ 
    return this.restService.getRequest('https://pezitrrestapi.herokuapp.com/api/orgCnt');
    // return this.restService.getRequest('http://localhost:8080/api/orgCnt');
}
}