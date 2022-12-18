import {Injectable} from '@nestjs/common';
import {Notification} from 'src/application/entities/notification';
import {NotificationRepository} from '../../../../application/repositories/notification-repository';
import {PrismaService} from '../prisma.service';

@Injectable()
export class PrimsaNotificationRepository implements NotificationRepository {
    constructor(private prismaService: PrismaService) {}
    async create(notification: Notification): Promise<void> {
        const {category, id, content, createdAt, readAt, recipientId} =
            notification;
        await this.prismaService.notification.create({
            data: {
                id,
                category,
                content: content.value,
                recipientId,
                readAt,
                createdAt,
            },
        });
    }
}
