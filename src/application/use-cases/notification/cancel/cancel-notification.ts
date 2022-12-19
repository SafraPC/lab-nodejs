import {NotificationNotFound} from '../../../use-cases/errors/notification-not-found';
import {Injectable} from '@nestjs/common';
import {NotificationRepository} from '../../../../application/repositories/notification-repository';

export interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: CancelNotificationRequest,
    ): Promise<CancelNotificationResponse> {
        const {notificationId} = request;
        const notification = await this.notificationRepository.findById(
            notificationId,
        );
        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.notificationRepository.save(notification);
    }
}
