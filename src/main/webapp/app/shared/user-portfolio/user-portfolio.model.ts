export enum gender {
    'MALE', 'FEMALE'
}
export interface UserPortfolio {
    id?: number;
    displayName?: string;
    description?: string;
    gender?: gender;
    imageContentType?: string;
    image?: any;
    userId?: number;
    userNameLogin?: string;
    userNameId?: number;
}