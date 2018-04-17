/**Gender in user portfolio */
export enum gender {
    'MALE' = 0, 'FEMALE' = 1
}

/**UserPortfolio model (Model use in service)*/
export interface UserPortfolio {
    id?: number;
    displayName?: string;
    description?: string;
    gender: String;
    imageContentType?: string;
    image?: any;
    userId?: number;
    userNameLogin?: string;
    userNameId?: number;
}
