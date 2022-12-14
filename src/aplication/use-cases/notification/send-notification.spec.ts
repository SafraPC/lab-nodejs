import {InMemoryNotificationRepository} from '../../../../test/repositories/in-memory-notifications';
import {SendNotification} from './send-notification';

describe('Send notification', () => {
    it('Should be able to send notification', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const {notification} = await sendNotification.execute({
            content: 'This is a notification',
            category: 'Social',
            recipientId: '123',
        });
        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});
