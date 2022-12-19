import {Injectable} from '@nestjs/common';
import {NotificationRepository} from '@application/repositories/notification-repository';
import {PrismaService} from '../prisma.service';
import {Notification} from '@application/entities/notification';
import {PrismaNotificationMapper} from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrimsaNotificationRepository implements NotificationRepository {
    constructor(private prismaService: PrismaService) {}

    async findById(id: string): Promise<Notification | null> {
        const prismaNotification =
            await this.prismaService.notification.findUnique({
                where: {
                    id: id,
                },
            });
        if (!prismaNotification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(prismaNotification);
    }

    async findManyRecipientId(recipientId: string): Promise<Notification[]> {
        const prismaNotifications =
            await this.prismaService.notification.findMany({
                where: {
                    recipientId,
                },
            });
        return prismaNotifications.map(PrismaNotificationMapper.toDomain);
    }

    async create(notification: Notification): Promise<void> {
        const notificationPersisted =
            PrismaNotificationMapper.toPrisma(notification);
        await this.prismaService.notification.create({
            data: notificationPersisted,
        });
    }

    async countManyRecipientId(recipientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where: {
                recipientId,
            },
        });
        return count;
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }
}
