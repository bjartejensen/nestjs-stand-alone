import { Module } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore/firestore.service';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';

@Module({
  controllers: [EventController],
  providers: [EventService,FirestoreService]
})
export class EventModule {}
