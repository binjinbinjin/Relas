import { BaseEntity } from './../../shared';

export class ChatRoomMemberMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public chatIDChatID?: string,
        public chatIDId?: number,
        public memberIDLogin?: string,
        public memberIDId?: number,
    ) {
    }
}
