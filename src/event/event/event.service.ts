import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { FirestoreService } from "../../firestore/firestore/firestore.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EventService {

    constructor(
        private readonly configService: ConfigService,
        private readonly firestoreService: FirestoreService
    ) {}

    async getEvents(uid: string, jwt: string) {

        
                const root = this.configService.get<string>("FIRESTORE_ROOT_COLLECTION");
            
                const eventsCollection = this.configService.get<string>(
                "FIRESTORE_EVENTS_COLLECTION"
                );

                //const path= `${root}/${uid}/${eventsCollection}`;
                //console.log("path",path);
            
                const result = await this.firestoreService.db
                .collection(`${root}/${uid}/${eventsCollection}`)
                .get();

                console.log("res",result);
            
                return await result.docs.map((x) => x.data()); 

    }


}
