import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import * as admin from "firebase-admin";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class FirestoreService {

    private firestore: FirebaseFirestore.Firestore;
    private root = this.configService.get<string>("FIRESTORE_ROOT_COLLECTION");

    constructor(private readonly configService:ConfigService){
/*         if (!admin.apps.length) {
            const dbUrl = this.configService.get<string>("FIRESTORE_DB");
            console.log("dbURL",dbUrl);

            admin.initializeApp({
              credential: admin.credential.applicationDefault(),
              databaseURL: dbUrl, 
            });
          }
 */
           /*  await admin.messaging().sendToDevice(fcmtoken, payload);         
            this.firestore = admin.firestore(); */

    }

    async checkUser(jwt: string) {
        console.log("in here");
        return await admin.auth().verifyIdToken(jwt);
    }
  
    get db(): FirebaseFirestore.Firestore {
        return this.firestore;
    }

  



}
