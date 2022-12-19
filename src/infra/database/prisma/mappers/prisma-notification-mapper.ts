import {Notification} from '@application/entities/notification';
import {Content} from '@application/entities/notification/content';
import {Notification as RawNotification} from '@prisma/client';
export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        };
    }

    static toDomain(raw: RawNotification): Notification {
        return new Notification(
            {
                ...raw,
                content: new Content(raw.content),
            },
            raw.id,
        );
    }
}