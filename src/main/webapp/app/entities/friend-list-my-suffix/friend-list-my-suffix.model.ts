import { BaseEntity } from './../../shared';

export class FriendListMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userRelationship?: string,
        public remark?: string,
        public userIDLogin?: string,
        public userIDId?: number,
        public friendIDLogin?: string,
        public friendIDId?: number,
    ) {
    }
}
