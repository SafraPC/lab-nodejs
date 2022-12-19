import {InMemoryNotificationRepository} from '../../../../../test/repositories/in-memory-notifications';
import {GetRecipientNotification} from './list-recipient-notifications';
import {makeNotification} from '../../../../../test/factories/notification-factory';

describe('Get recipients notifications', () => {
    it('shoude be able to get recipients notifications', async () => {
        const notificationsRepository = new InMemoryNotificationRepository();
        const totalRecipientsNotifications = new GetRecipientNotification(
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

        const {notifications} = await totalRecipientsNotifications.execute({
            recipientId: 'recipient1',
        });
        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({recipientId: 'recipient1'}),
                expect.objectContaining({recipientId: 'recipient1'}),
            ]),
        );
    });
});
