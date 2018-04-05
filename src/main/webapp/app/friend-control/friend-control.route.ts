import { addFriendRoute } from './add-friend/add-friend.route';
import { showFriendRequestRoute } from './show-friend-request/show-friend-request.route';
import { Routes } from '@angular/router';

export const friendControlMainRoute: Routes = [
    {
        path: 'friend', redirectTo: 'friend/add-friend', pathMatch: 'full'},
    addFriendRoute, showFriendRequestRoute
];
