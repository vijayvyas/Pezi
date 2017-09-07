export interface User {
  _id:string;
  email: string;
  fname: string;
  mobileno:string;
  lname: string;
  cname: string;
  experience: number;
  city1: number;
  city2: number;
  area1: number;
  area2: number;
  html: number;
  css: number;
  java: number;
  net: number;
  name: string;
  checked:string;
  //userNameReg:string;
 
  ques1: {
     chckbox_perl:string;
     chckbox_javascript:string;
     chckbox_php:string;
     chckbox_go:string;
     chckbox_c:string;
     chckbox_unix:string;
     chckbox_scala:string;
     chckbox_python:string;
     chckbox_objectC:string;
     chckbox_ruby:string;
     chckbox_java:string;
     chckbox_chash:string;
     otherText:string;
    //postcode?: string;
  }
  ques2: {
    oop_redio1:string;
    java_redio1:string;
    cdevel_redio1:string;
    javaSc_redio1:string;
    htmlcss_redio1:string;
  }
  ques3:{
    ques3TextArea:string;
  }
}