
/**Model for friend in friends list (Model use in service)*/
export class FriendListModel {
    private friendDescription?: string;
    private friendImage?: any;
    private friendImageContentType?: string;
    public friendDisplayName?: string;
    constructor(
        public id?: number, // (property use in service)
        public userRelationship?: string, // (property use in service)
        public remark?: string, // (property use in service)
        public userIDLogin?: string, // (property use in service)
        public userIDId?: number, // (property use in service)
        public friendIDLogin?: string, // (property use in service)
        public friendIDId?: number, // (property use in service)
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
