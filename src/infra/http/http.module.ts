import {CancelNotification} from '@application/use-cases/notification/cancel/cancel-notification';
import {CountRecipientNotification} from '@application/use-cases/notification/count/count-recipient-notifications';
import {GetRecipientNotification} from '@application/use-cases/notification/list-recipient-notifications/list-recipient-notifications';
import {ReadNotification} from '@application/use-cases/notification/read-notification/read-notification';
import {SendNotification} from '@application/use-cases/notification/send/send-notification';
import {UnreadNotification} from '@application/use-cases/notification/unread-notification/unread-notification';
import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {NotificationController} from './controllers/notifications.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationController],
    providers: [
        SendNotification,
        CancelNotification,
        ReadNotification,
        CountRecipientNotification,
        GetRecipientNotification,
        UnreadNotification,
    ],
})
export class HttpModule {}
