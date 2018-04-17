import { ChatMessage } from './chat-message.model';
import { ChatRoomMemberModel } from './chat-room-member.model';

/**Model for ChatRoomModel(chat room) and
 * ChatRoomMemberModel[](a list of member in friend room)
 * (Model use in service)
 * */
export class ChatRoomsAndMembersModel {
    constructor(public chatRoom: ChatRoomModel, public members?: ChatRoomMemberModel[]) {}
}

/**
 *Model for chat room
 * (Model use in service)
 */
export class ChatRoomModel {
    constructor(
        public id?: number,
        public chatID?: number,
        public maxMember?: number,
        public chatRoomName?: string,
        public description?: string,
    ) {
    }
}

/**Model for store the data of each member in chat thread (chat room)
 *in client side (The model do not user in service)
 */
export class ChatRoomMemberDataModel {
    constructor(
        public login?: string,
        public id?: number,
        public displayName?: string,
        public image?: any,
        public imageContentType?: string
    ) {}

    /**Initial the class from the  a ChatRoomMemberModel object and
     * ChatMessageImageDisplayModel object and user display name
     * @param member ChatRoomMemberModel from service
     * @param image data about the image
     * @param displayName member display name
    */
    initialFromChatRoomMeberModel(member: ChatRoomMemberModel,
        image: ChatMessageImageDisplayModel,
        displayName: string ) {

        this.dataValidation(member, image, displayName);
        this.login = member.memberIDLogin;
        this.displayName = displayName;
        this.image = image.image;
        this.imageContentType = image.imageContentType;
    }

    /**To check the parameters are valid to initialize the object or not
     * @param member ChatRoomMemberModel from service
     * @param image data about the image
     * @param displayName member display name
     */
    dataValidation(member: ChatRoomMemberModel,
        image: ChatMessageImageDisplayModel,
        displayName: string ) {

        if (!member.chatIDId || !member.memberIDLogin)
            throw new Error('chatIDid and memberIDLogin can not be null');
        if (!image || !image.image || !image.imageContentType)
            throw new Error('Image realted data cannot be null');
        if (!displayName)
            throw new Error('displayName cannot be null');
    }
}

export class ChatMessageImageDisplayModel {
    constructor(public image: any, public imageContentType: string) {}
}

/**Model for store the data of each chat thread (chat room)
 *in client side (The model do not user in service)
 */
export class ChatRoomDataModel {
    messages: ChatMessage[];
    constructor(
        public chatId?: number,
        public chatRoomModel?: ChatRoomModel,
        public members?: ChatRoomMemberDataModel[],
        public maxMembers?: number,
        public chatRoomName?: string,
        public description?: string,
    ) {
        this.messages = [];
    }

    /**
     * Inital the object using the ChatRoomModel
     * @param model the data from service
     */
    initialUsingChatRoomModel(model: ChatRoomModel): void {
        if (!model.chatID || !model.maxMember)
            throw new Error('model.chatID and model.maxMember must contains a value, and value cannot be zeor');
        this.chatId = model.chatID;
        this.maxMembers = model.maxMember;
        this.chatRoomName = model.chatRoomName;
        this.description = model.description;
    }

    /**
     * Add a new messages to chat room
     * @param chatMessages new messages
     */
    addMessages(chatMessages: ChatMessage[]): void {
        chatMessages.forEach((each) => this.addMessage(each));
    }

    /**
     * Add a new message to chat room
     * @param chatMessages new message
     */
    addMessage(chatMessage: ChatMessage): void {
        this.messages.push(chatMessage);
    }

    /**
     * Add new member to chat room
     * @param newMember new member
     */
    addMember(newMember: ChatRoomMemberDataModel): void {
        try {
            this.memberDataValidation(newMember);
            this.chatRoomMemberLimitValidation(1);
        } catch (err) {
            return;
        }
        this.memberDataValidation(newMember);
        if (!this.members || this.members.length === 0) {
            this.members = [];
        } else {
            const temp = this.members.filter((item) => {
                return item.login === newMember.login ? true : false;
            });
            if (temp.length > 0) return;
        }
        this.members.push(newMember);
    }

    /**
     * Add new members to chat room
     * @param newMembers new members
     */
    addMembers(newMembers: ChatRoomMemberDataModel[]): void {
        newMembers.forEach((each) => {
            this.addMember(each);
        });
    }

    /**
     * To check the new member object is valid or not
     * @param member new member
     * @throws An error will occur if the data in member is not valid
     */
    private memberDataValidation(member: ChatRoomMemberDataModel): void {
        if (!member.login || !member.displayName ||
            !member.image || !member.imageContentType)
            throw new Error('Invalid chat room member data model,' +
            ' member.login or member.displayName or member.image ' +
            ' or member.imageContentType can not be null');
    }

    /**
     * Make sure with n more members in chat room won't
     * exceed the limit
     * @param n n more members
     * @throws if exceed the limt
     */
    private chatRoomMemberLimitValidation(n: number): void {
        if (this.members && this.members.length + n <= this.maxMembers)
            return;
        if (!this.members && n <= this.maxMembers)
            return;

        throw new Error(`Cannot add ${n} more new member/s to chat room,
        beacue the capacity of chat room are ${this.maxMembers} members,
        and currently have ${(this.members) ? this.members.length : 0} members`);
    }

    /**
     * Get the image data of user in the chat room
     * @param login user's login
     * @returns a ChatMessageImageDisplayModel object will be return
     */
    getUserDisplayImageByLogin(login: string): ChatMessageImageDisplayModel  {
        if (!this.members || this.members.length === 0 ) return null;

        this.members.forEach((each) => {
            if (each.login === login)
                return new ChatMessageImageDisplayModel(each.image, each.imageContentType);
        });
        return null;
    }
}
