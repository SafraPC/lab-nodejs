import {Content} from './content';

describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content(
            'Você recebeu uma nova solicitação de amizade!',
        );
        expect(content).toBeTruthy();
    });

    it('should be not be able to create a notification with content less than 5 characters', () => {
        expect(() => new Content('123')).toThrow();
    });

    it('should be not be able to create a notification with content more than 240 characters', () => {
        expect(() => new Content('0'.repeat(241))).toThrow();
    });
});
