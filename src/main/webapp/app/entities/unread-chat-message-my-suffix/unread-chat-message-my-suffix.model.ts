import { BaseEntity } from './../../shared';

export class UnreadChatMessageMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public messageId?: number,
        public userIDLogin?: string,
        public userIDId?: number,
    ) {
    }
}
