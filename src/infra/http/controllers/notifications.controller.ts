import {Body, Controller, Post} from '@nestjs/common';
import {SendNotification} from 'src/application/use-cases/notification/send-notification';
import {CreateNotificationBody} from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationController {
    constructor(private sendNotification: SendNotification) {}

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const {category, content, recipientId} = body;
        const {notification} = await this.sendNotification.execute({
            category,
            content,
            recipientId,
        });

        return {
            notification,
        };
    }
}
