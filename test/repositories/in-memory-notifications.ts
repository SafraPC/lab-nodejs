import {Notification} from 'src/application/entities/notification';
import {NotificationRepository} from '../../src/application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
    async findManyRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(
            item => item.recipientId === recipientId,
        );
    }
    public notifications: Notification[] = [];

    async countManyRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(
            item => item.recipientId === recipientId,
        ).length;
    }

    async findById(id: string): Promise<Notification | null> {
        const notification = this.notifications.find(item => item.id === id);

        if (!notification) {
            return null;
        }

        return notification;
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(
            item => item.id === notification.id,
        );

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification);
    }
}
