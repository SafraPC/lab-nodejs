import {Content} from '../../src/application/entities/notification/content';
import {
    Notification,
    NotificationProps,
} from '../../src/application/entities/notification/index';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'Social',
        content: new Content('This is a notification'),
        recipientId: 'recipient-2',
        ...override,
    });
}
