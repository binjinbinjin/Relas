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
