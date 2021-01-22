import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { FirestoreService } from './firestore/firestore/firestore.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "development.env",
      isGlobal: true,
    }),
    MailModule,
    EventModule],
  controllers: [AppController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
