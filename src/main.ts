import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  // Set the config options

  const key =configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
  console.log("key", key);

  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": key,
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: configService.get<string>('FIRESTORE_DB'),
  });

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap().then(()=>console.log("Works!")).catch((err)=> console.log("err", err) )
