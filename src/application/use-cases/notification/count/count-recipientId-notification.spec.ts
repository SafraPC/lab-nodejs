import {InMemoryNotificationRepository} from '../../../../../test/repositories/in-memory-notifications';
import {CountRecipientNotification} from './count-recipient-notifications';
import {makeNotification} from '../../../../../test/factories/notification-factory';

describe('Count recipients notifications', () => {
    it('shoude be able to count recipients notifications', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const totalRecipientsNotifications = new CountRecipientNotification(
            notificationsRepository,
        );

        await notificationsRepository.create(
            makeNotification({
                recipientId: 'recipient1',
            }),
        );
        await notificationsRepository.create(
            makeNotification({
                recipientId: 'recipient1',
            }),
        );
        await notificationsRepository.create(makeNotification());

        const {count} = await totalRecipientsNotifications.execute({
            recipientId: 'recipient1',
        });
        expect(count).toBe(2);
    });
});
