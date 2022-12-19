import {NotificationNotFound} from '../../errors/notification-not-found';
import {Injectable} from '@nestjs/common';
import {NotificationRepository} from '../../../repositories/notification-repository';
import {Notification} from '@application/entities/notification';

export interface GetRecipientNotificationRequest {
    recipientId: string;
}

interface GetRecipientNotificationResponse {
    notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: GetRecipientNotificationRequest,
    ): Promise<GetRecipientNotificationResponse> {
        const {recipientId} = request;
        const notifications =
            await this.notificationRepository.findManyRecipientId(recipientId);

        return {
            notifications,
        };
    }
}
