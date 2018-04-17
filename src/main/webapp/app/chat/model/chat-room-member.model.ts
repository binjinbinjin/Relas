/**
 * Model for chat room member
 * (Mdoel use in service)
 */
export class ChatRoomMemberModel {
    constructor(
        public id?: number,
        public chatIDChatID?: string,
        public chatIDId?: number,
        public memberIDLogin?: string,
        public memberIDId?: number,
    ) {
    }
}
