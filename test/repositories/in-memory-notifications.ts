import {Notification} from 'src/aplication/entities/notification';
import {NotificationRepository} from '../../src/aplication/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
    public notifications: Notification[] = [];
    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }
}
