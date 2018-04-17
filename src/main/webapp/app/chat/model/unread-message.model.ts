/**
 * Model for record the unread message
 * (Model use in service)
 */
export class UnreadChatMessageModel {
    constructor(
        public id?: number,
        public messageId?: number,
        public userIDLogin?: string,
        public userIDId?: number,
    ) {
    }
}
