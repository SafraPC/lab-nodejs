import {Notification} from '../../../entities/notification/index';
import {Content} from '../../../entities/notification/content';
import {InMemoryNotificationRepository} from '../../../../../test/repositories/in-memory-notifications';
import {CancelNotification} from './cancel-notification';
import {NotificationNotFound} from '../../../use-cases/errors/notification-not-found';
import {makeNotification} from '../../../../../test/factories/notification-factory';

describe('Cancel notification', () => {
    it('Should be able to cancel notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(
            notificationsRepository,
        );

        const notification = makeNotification();
        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    });

    it("Should not be able to cancel a notification that doesn't exist", async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(
            notificationsRepository,
        );

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
