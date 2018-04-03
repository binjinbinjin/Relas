
export class FriendListModel {
    private friendDescription?: string;
    private friendImage?: any;
    private friendImageContentType?: string;
    private friendDisplayName?: string;
    constructor(
        public id?: number,
        public userRelationship?: string,
        public remark?: string,
        public userIDLogin?: string,
        public userIDId?: number,
        public friendIDLogin?: string,
        public friendIDId?: number,
    ) {}

    public getFriendDescription(): string {
        return this.friendDescription;
    }

    public getFriendImage(): any {
        return this.friendImage;
    }

    public getFriendDisplayName(): string {
        return this.friendDisplayName;
    }

    public getFriendImageContentType(): string {
        return this.friendImageContentType;
    }

    public setFriendDisplayName(name: string) {
        this.friendDisplayName = name;
    }
    public setFriendDescription(friendDescription: string) {
        this.friendDescription = friendDescription;
    }

    public setfriendImage(friendImage: any) {
        this.friendImage = friendImage;
    }

    public setFriendImageContentType(friendImageContentType: string) {
        this.friendImageContentType = friendImageContentType;
    }

    /**Return true iff this friend in the list is ready to dispay */
    public friendInfoCheck(): boolean {
        return (this.friendImage && this.friendImageContentType && this.friendDisplayName) ? true : false;
    }
}
