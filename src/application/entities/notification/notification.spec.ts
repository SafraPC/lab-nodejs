import {Content} from './content';
import {Notification} from './index';

describe('Notification', () => {
    it('Should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de amizade!'),
            category: 'social',
            recipientId: '123',
        });
        expect(notification).toBeTruthy();
    });
});
