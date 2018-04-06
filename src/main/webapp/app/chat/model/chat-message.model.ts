
export enum ChatMessageStatusEnum {
    READ = 'READ', UNREAD = 'UNREAD'
}
export class ChatMessage {
    constructor(
        public image: any,
        public imageType: string,
        public senderLogin: string,
        public sendInMessage: boolean,
        public message: string,
        public messageStatus: ChatMessageStatusEnum,
        public time?: any,
    ) {}
}
