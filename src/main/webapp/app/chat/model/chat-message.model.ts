import { ChatMessageImageDisplayModel } from './chat-room.model';

/**
 * Model for store the data of each chat message
 * (This data model is use in client side only)
 */
export class ChatMessage {
    public isRead: boolean;
    constructor(
        public image?: any,
        public imageType?: string,
        public senderLogin?: string,
        public sendInMessage?: boolean,
        public message?: string,
        public time?: any,
        public accessoryContentType?: string,
        public accessory?: any,
        public id?: number,
        public messageId?: number
    ) {
        this.isRead = false;
    }
}

/**Model for chat message
 * (Model use in service)
 */
export class ChatMessageModel {
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

/**
 * Covert a ChatMessage object to ChatMessageModel
 * @param message a message
 * @param chatId chat room id
 * @returns a ChatMessageModel after convert
 */
export const convertChatMessageToChatMessageModel = (message: ChatMessage, chatId: number): ChatMessageModel  => {
    const messageModel = new ChatMessageModel();
    messageModel.time = message.time;
    messageModel.messageSenderLogin = message.senderLogin;
    messageModel.accessory = message.accessory;
    messageModel.accessoryContentType = message.accessoryContentType;
    messageModel.message = message.message;
    messageModel.chatIDId = chatId;
    return messageModel;
};

/**
 * Convert a ChatMessageModel to ChatMessage
 * @param messageModel a chatMessageModel object
 * @param image image data
 * @param imageContentType image type
 * @returns a ChatMessage after convert
 */
export const convertChatMessageModelToChatMessageA = (messageModel: ChatMessageModel, image: any, imageContentType: string): ChatMessage => {
    const message = new ChatMessage();
    message.time = messageModel.time;
    message.senderLogin = messageModel.messageSenderLogin;
    message.accessory = messageModel.accessory;
    messageModel.accessoryContentType = message.accessoryContentType ;
    message.message = messageModel.message;
    message.image = image;
    message.imageType = imageContentType;
    message.id = messageModel.chatIDId;
    message.messageId = messageModel.id;
    return message;
};

/**
 * Convert a ChatMessageModel to ChatMessage
 * @param messageModel a chatMessageModel object
 * @param image An object contains the image data
 * @returns a ChatMessage after convert
 */
export function convertChatMessageModelToChatMessageB(messageModel: ChatMessageModel, image: ChatMessageImageDisplayModel): ChatMessage {
    const message = new ChatMessage();
    message.time = messageModel.time;
    message.senderLogin = messageModel.messageSenderLogin;
    message.accessory = messageModel.accessory;
    messageModel.accessoryContentType = message.accessoryContentType;
    message.message = messageModel.message;
    message.image = image.image;
    message.imageType = image.imageContentType;
    message.id = messageModel.chatIDId;
    message.messageId = messageModel.id;
    return message;
}
