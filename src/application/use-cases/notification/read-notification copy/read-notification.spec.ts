import {InMemoryNotificationRepository} from '../../../../../test/repositories/in-memory-notifications';
import {ReadNotification} from './read-notification';
import {NotificationNotFound} from '../../errors/notification-not-found';
import {makeNotification} from '../../../../../test/factories/notification-factory';

describe('read notification', () => {
    it('Should be able to read notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        const notification = makeNotification();
        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date),
        );
    });

    it("Should not be able to read a notification that doesn't exist", async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});
