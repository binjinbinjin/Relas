import { BaseEntity } from './../../shared';

export const enum DatingProgress {
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
    'L6',
    'L7',
    'L8',
    'L9',
    'L10'
}

export class DatingRecordMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public progress?: DatingProgress,
        public userOneLogin?: string,
        public userOneId?: number,
        public userTwoLogin?: string,
        public userTwoId?: number,
    ) {
    }
}
