import { FriendshipService } from '../friendship.service';
import { getFriendRequest } from '../friend-control/friend-control.epics';

/**App(root) level Epics, all the epics will add here */
export function createEpics(friendshipService: FriendshipService) {
        return [
            getFriendRequest(friendshipService) // Epics for friend-control
        ];
}
