import { BaseEntity } from './../../shared';

export class ChatMessageMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public message?: string,
        public accessoryContentType?: string,
        public accessory?: any,
        public chatIDChatID?: string,
        public chatIDId?: number,
        public messageSenderLogin?: string,
        public messageSenderId?: number,
    ) {
    }
}
