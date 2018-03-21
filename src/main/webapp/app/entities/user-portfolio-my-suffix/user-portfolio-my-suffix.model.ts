import { BaseEntity } from './../../shared';

export const enum GenderEnum {
    'MALE',
    'FEMALE'
}

export class UserPortfolioMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public displayName?: string,
        public description?: string,
        public gender?: GenderEnum,
        public imageContentType?: string,
        public image?: any,
        public userId?: number,
        public userNameLogin?: string,
        public userNameId?: number,
    ) {
    }
}
