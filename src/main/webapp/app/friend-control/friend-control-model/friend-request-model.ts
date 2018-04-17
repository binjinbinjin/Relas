import { FriendshipRequest } from './friend-request-model';
export enum friendRequestReason {
    'FRIEND' = 0,
    'COLLEAGUE' = 1,
    'CLASSMATE' = 2,
    'FAMILY' = 3,
    'DATING' = 4,
    'STRANGER' = 5
}

/**
 * FriendshipRequest model, this model is the data model for a friendship request
 *
 * This data model is both for 1. when user wants to add a new friend,
 * 2. when user wants to introduce a friend to an other user
 *
 * (Model use in service)
 */
export interface FriendshipRequest {
    id?: number;
    time: any;
    reason?: friendRequestReason;
    introduceByLogin?: string;
    introduceById: number;
    introduceToLogin?: string;
    introduceToId: number;
    introduceUserIDLogin?: string;
    introduceUserIDId: number;
}

/**A function to create a FriendshipService object*/
export function defaultFriendShipRequestObject(): FriendshipRequest {
    return {
        time: new Date(),
        introduceById: -1,
        introduceToId: -1,
        introduceUserIDId: -1
    };
}
