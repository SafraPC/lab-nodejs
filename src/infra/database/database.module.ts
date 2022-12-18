import {Module} from '@nestjs/common';
import {NotificationRepository} from 'src/application/repositories/notification-repository';
import {PrismaService} from './prisma/prisma.service';
import {PrimsaNotificationRepository} from './prisma/repositories/prisma-notification-repository';

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationRepository,
            useClass: PrimsaNotificationRepository,
        },
    ],
    exports: [NotificationRepository],
})
export class DatabaseModule {}
