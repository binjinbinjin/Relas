import { getFriendRequest } from '../friend-control/friend-control.epics';
import { FriendshipRequestService } from '../service/friendshipRequest.service';

/**App(root) level Epics, all the epics will add here */
export function createEpics(friendshipService: FriendshipRequestService) {
        return [
            getFriendRequest(friendshipService) // Epics for friend-control
        ];
}
