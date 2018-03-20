import { BaseEntity } from './../../shared';

export class ChatRoomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public chatID?: number,
        public maxMember?: number,
        public chatRoomName?: string,
        public description?: string,
    ) {
    }
}
