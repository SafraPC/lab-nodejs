import {randomUUID} from 'node:crypto';
import {Replace} from 'src/helpers/replace';
import {Content} from './content';

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    createdAt: Date;
    canceledAt?: Date | null;
}

export class Notification {
    private props: NotificationProps;
    private _id: string;
    constructor(
        props: Replace<
            NotificationProps,
            {
                createdAt?: Date;
            }
        >,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get category(): string {
        return this.props.category;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public read(): void {
        this.props.readAt = new Date();
    }

    public unread(): void {
        this.props.readAt = null;
    }

    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    public cancel(): void {
        this.props.canceledAt = new Date();
    }
}
