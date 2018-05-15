/**
 * Model for feed
 * (Model use in service)
 */
export class FeedModel {
    constructor(
        public id?: number,
        public time?: any,
        public message?: string,
        public accessoryContentType?: string,
        public accessory?: any,
        public userIDLogin?: string,
        public userIDId?: number,
    ) {
    }
}
