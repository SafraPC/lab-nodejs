import {CancelNotification} from '@application/use-cases/notification/cancel/cancel-notification';
import {CountRecipientNotification} from '@application/use-cases/notification/count/count-recipient-notifications';
import {GetRecipientNotification} from '@application/use-cases/notification/list-recipient-notifications/list-recipient-notifications';
import {ReadNotification} from '@application/use-cases/notification/read-notification/read-notification';
import {SendNotification} from '@application/use-cases/notification/send/send-notification';
import {UnreadNotification} from '@application/use-cases/notification/unread-notification/unread-notification';
import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateNotificationBody} from '../dtos/create-notification-body';
import {NotificationViewModel} from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
    constructor(
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
        private countRecipientNotification: CountRecipientNotification,
        private getRecipientNotification: GetRecipientNotification,
    ) {}

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string) {
        await this.cancelNotification.execute({
            notificationId: id,
        });
    }

    @Get('count/from/:recipientId')
    async countFromRecipient(
        @Param('recipientId') recipientId: string,
    ): Promise<{count: number}> {
        const {count} = await this.countRecipientNotification.execute({
            recipientId,
        });

        return {
            count,
        };
    }

    @Get('from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
        const {notifications} = await this.getRecipientNotification.execute({
            recipientId,
        });

        return {
            notifications: notifications.map(NotificationViewModel.toHttp),
        };
    }

    @Patch(':id/read')
    async read(@Param('id') id: string) {
        await this.readNotification.execute({
            notificationId: id,
        });
    }

    @Patch(':id/unread')
    async unread(@Param('id') id: string) {
        await this.unreadNotification.execute({
            notificationId: id,
        });
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const {category, content, recipientId} = body;
        const {notification} = await this.sendNotification.execute({
            category,
            content,
            recipientId,
        });
        return {
            notification: NotificationViewModel.toHttp(notification),
        };
    }
}
