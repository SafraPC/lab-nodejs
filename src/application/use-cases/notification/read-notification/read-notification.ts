import {NotificationNotFound} from '../../../use-cases/errors/notification-not-found';
import {Injectable} from '@nestjs/common';
import {NotificationRepository} from '../../../../application/repositories/notification-repository';

export interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: ReadNotificationRequest,
    ): Promise<ReadNotificationResponse> {
        const {notificationId} = request;
        const notification = await this.notificationRepository.findById(
            notificationId,
        );
        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationRepository.save(notification);
    }
}
