import { BaseEntity } from './../../shared';

export const enum IntroduceUserReason {
    'FRIEND',
    'COLLEAGUE',
    'CLASSMATE',
    'FAMILY',
    'DATING',
    'STRANGER'
}

export class IntroduceUserMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public reason?: IntroduceUserReason,
        public introduceByLogin?: string,
        public introduceById?: number,
        public introduceToLogin?: string,
        public introduceToId?: number,
        public introduceUserIDLogin?: string,
        public introduceUserIDId?: number,
    ) {
    }
}
