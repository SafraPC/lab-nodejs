import {Module} from '@nestjs/common';
import {SendNotification} from 'src/aplication/use-cases/notification/send-notification';
import {DatabaseModule} from '../database/database.module';
import {NotificationController} from './controllers/notifications.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [SendNotification],
})
export class HttpModule {}
