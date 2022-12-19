import {Notification} from '../entities/notification';

export abstract class NotificationRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(id: string): Promise<Notification | null>;
    abstract save(notification: Notification): Promise<void>;
    abstract countManyRecipientId(recipientId: string): Promise<number>;
    abstract findManyRecipientId(recipientId: string): Promise<Notification[]>;
}
