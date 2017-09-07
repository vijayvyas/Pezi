import {Injectable} from "@angular/core";
import{Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/Rx";
import {User} from '../components/userdata/userModel.interface';
import {RestService} from '../services/posts.service';

@Injectable()
export class Email{

    private successFlag:boolean;
    // private mailgunUrl:string ="https://api.mailgun.net/v3/";
    // private domainName: string = "sandboxd52fa1aeb8144684a015af6f44784e7c.mailgun.org";
    // private apiKey: string = "api:key-1e4b08d547b07fa6b47fefc2cbd4cdbb";

    public constructor(private restService: RestService) { }

    // public send(model:User) {
    //     console.log("Email component invoke : "+ model.email);
    //     this.recipient=model.email;
    //     this.sender="info@pezitr.com";
    //     this.subject="Thanks :" + model.fname;
    //     this.message="Thanks " +model.fname+", We will get back to you soon...";
    //     if(this.recipient && this.subject && this.message) {
    //         let headers = new Headers(
    //             {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //                 "Authorization": "Basic " +window.btoa(this.apiKey),
                   
    //             }
    //         );

    //         let options = new RequestOptions({ headers: headers });
    //         let body = "from=" + this.sender + "&to=" + this.recipient + "&subject=" + this.subject + "&text=" + this.message;
    //         this.http.post(this.mailgunUrl + this.domainName + "/messages", body, options).timeout(1500000)
    //             .map(result =>{ return result.json();} )
    //             .do(result => console.log("RESULT: ", JSON.stringify(result)))
    //             .subscribe(result => {
    //                 console.log(" Mail has been SENT! To: " +this.recipient);
    //                 this.recipient = "";
    //                 this.subject = "";
    //                 this.message = "";
    //             }, error => {
    //                 console.log(error);
    //             });
    //     }
    // }

public registerUserSend(model:User): boolean{
        console.log("Email component invoke : "+ model.email);
         if(model.email) {
            let headers = new Headers(
                {
                    "Content-Type": "application/json",
                    'dochk':this.restService.doChk                   
                }
            );
            let options = new RequestOptions({ headers: headers });
            let emailTemplate: EmailTemplate= <EmailTemplate>{ };
            emailTemplate.to=model.email;
            emailTemplate.subject= "Reminder : Pre Assignment Angular 2.0" ;
            emailTemplate.message=  `Hi `+ model.fname+`,
            
            Thanks for giving us your overwhelming response and applying FREE Angular intensive course.
            We are sorry to mention that, we have not received your assignment yet.
            
            It has been requested by various candidates to extend the the assignment submission date, 
            therefore we are extending it by one week, till 27th May.
            
            Please complete pre assignment by 27th May, else you will not be eligible to participate in the sessions.
                
            Click on below link to get more information about pre assignment.

                https://www.pezitr.com/angularassignment

            If you have any questions, call us @ 020-67090767 / 7976796113 Or write us at info@pezitr.com.
            

            Thanks,
            Pezitr Team
            `;
     
            
            this.restService.postRequest("https://pezitrrestapi.herokuapp.com/sendEmail", JSON.stringify(emailTemplate), options)
                .subscribe(() => {
                    console.log(" Mail has been SENT! To: " +model.email);
                    this.successFlag=true;
 +                    console.log("SuccessFlag : "+this.successFlag);
                }, error => {
                    console.log(error);
                     this.successFlag=false;
                });
            return  this.successFlag;
        }
    }

    public send(model:User) {
        console.log("Email component invoke : "+ model.email);
        if(model.email) {
            let headers = new Headers(
                {
                    "Content-Type": "application/json",
                    'dochk':this.restService.doChk                  
                }
            );
            let options = new RequestOptions({ headers: headers });
            let emailTemplate: EmailTemplate= <EmailTemplate>{ };
            emailTemplate.to=model.email;
            emailTemplate.subject="Thanks :" + model.fname;
            emailTemplate.message=
            `Hi `+ model.fname+`,
            
            Thanks for applying and Welcome to our FREE Angular intensive course!
            
            Our program is designed to provide a highly effective learning process while bringing together a group of motivated engineers.
            
            We can only accept a maximum of 30 people in each program, as we receive hundreds of applications.

            There are a few more steps remaining in the application process.
            Please follow below link for more information about pre assignmet.
            
            `+location.protocol+"//" + location.host+`/angularassignment

            If you have any questions, please reply back to us at info@pezitr.com. 
            
            Thanks,
            Pezitr Team
`;
            
            // Thanks " +model.fname+", We will get back to you soon...1234";
            
                            // from=" + this.sender + "&to=" + this.recipient + "&subject=" + this.subject + "&text=" + this.message;
            // this.http.post("http://localhost:8080/", body, options).timeout(1500000)
            this.restService.postRequest("https://pezitrrestapi.herokuapp.com/sendEmail", JSON.stringify(emailTemplate), options)
                .subscribe(() => {
                    console.log(" Mail has been SENT! To: " +model.email);
                }, error => {
                    console.log(error);
                });
        }
    }

}

interface EmailTemplate{
    to:string,
    message:string,
    subject:string
}