import { Controller, Body, Post, Res, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const sgMail = require("@sendgrid/mail");

@Controller('mail')
export class MailController {

    constructor(private configService: ConfigService) {}

    @Post("send")
    async sendEmail(@Body() body:any, @Res() response: any){

        const mailfrom = body.from;
        const subject = body.subject;
        const message = body.message;

        console.log("hello world");

        const msg = {
            to: ["bjartejensen@gmail.com"],
            from: mailfrom,
            subject: subject,
            text: message,
            html: `<h1>${message}</h1>`,
          };

        const sendGridApiKey = this.configService.get<string>("SENDGRID_API_KEY");
        
        sgMail.setApiKey(sendGridApiKey);
        const resp = await sgMail.send(msg); 

        return await response.status(HttpStatus.OK).json({ status: resp });



    }

}
