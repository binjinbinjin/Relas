import { getFriendRequest } from '../friend-control/friend-control.epics';
import { FriendshipRequestService } from '../service/friendshipRequest.service';
import { FriendshipControlService } from '../service/friendshipControl.service';
import { getFriendList } from '../friend-list/friend-list.epics';

/**App(root) level Epics, all the epics will add here */
export function createEpics(friendshipService: FriendshipRequestService, friendshipControlService: FriendshipControlService) {
        return [
            getFriendRequest(friendshipService), // Epics for friend-control
            getFriendList(friendshipControlService), // Epics for friend-list
        ];
}
