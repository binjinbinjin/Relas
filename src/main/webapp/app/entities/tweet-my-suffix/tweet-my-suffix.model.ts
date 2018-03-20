import { BaseEntity } from './../../shared';

export class TweetMySuffix implements BaseEntity {
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
