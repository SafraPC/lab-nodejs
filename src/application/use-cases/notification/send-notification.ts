import {Injectable} from '@nestjs/common';
import {NotificationRepository} from '../../../application/repositories/notification-repository';
import {Content} from '../../entities/notification/content';
import {Notification} from '../../entities/notification/index';

export interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: SendNotificationRequest,
    ): Promise<SendNotificationResponse> {
        const {category, content, recipientId} = request;
        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });

        await this.notificationRepository.create(notification);

        return {
            notification,
        };
    }
}
