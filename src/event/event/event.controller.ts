import {
    Controller,
    Post,
    Body,
    Res,
    Get,
    HttpStatus,
    Headers,
    MethodNotAllowedException,
  } from "@nestjs/common";
import { FirestoreService } from "src/firestore/firestore/firestore.service";
import { EventService } from './event.service';


@Controller('event')
export class EventController {

constructor(private eventsService: EventService,
        private firestoreService:FirestoreService) {}

@Get("fetch")
async fetchEventModelsFromDB(@Headers() headers: any, @Res() response) {
  try {

    const uid = headers.uid;
    const jwt = headers.jwt;
   
    const models = await this.eventsService.getEvents(uid, jwt);

    return await response.status(HttpStatus.OK).send({ models: models });
  } catch (err) {
    
    
    console.log("err",JSON.stringify(err));

    return response
      .status(400)
      .send(`Event get all error: ${JSON.stringify(err)}`);
  }
}

}


