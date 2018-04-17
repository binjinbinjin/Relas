import { ChatRoomMemberModel } from './chat-room-member.model';
import { ChatRoomModel } from './chat-room.model';

/**Model for adding new member to chat room
 * (Model use in service)
 */
export class AddChatMemberModel {
    constructor(public chatId?: number, public addMembers?: number[]) {}
}

/**
 * Model for create a new chat room and add
 * new members to chat room
 * (Model use in service)
 */
export class CreateNewRoomAndAddChatMemberModel {
    constructor(public newMembers?: AddChatMemberModel,
        public room?: ChatRoomModel,
        public roomMembers?: ChatRoomMemberModel[]) {}
}
