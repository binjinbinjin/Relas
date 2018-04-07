import { ChatSocketService } from './service/chat-socket.service';
import { provideReduxForms } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { createEpics } from './app-store/app.epics';
import { AppStoreInitializer } from './app-store/app.initialize';
import { rootReducer } from './app-store/app.reducers';
import { AppStoreState, INITIAL_APP_STORE } from './app-store/app.store.model';
import { FriendshipRequestService } from './service/friendshipRequest.service';
import { FriendshipControlService } from './service/friendshipControl.service';
import { ChatRoomService } from './service/chat-room.service';
import { UnreadChatMessageService } from './service/unread-chat-message.service';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule, NgReduxRouterModule],
  providers: [FriendshipRequestService, FriendshipControlService, ChatRoomService, ChatSocketService, UnreadChatMessageService],
  exports: [],
  declarations: []
})
export class AppStoreModule {
  constructor(public store: NgRedux<AppStoreState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    friendshipService: FriendshipRequestService,
    friendshipControlService: FriendshipControlService
  ) {
      store.configureStore(
        rootReducer(friendshipService, friendshipControlService),
        INITIAL_APP_STORE,
        [/*createLogger(), */...createEpics(friendshipService, friendshipControlService)],
        devTools.isEnabled() ? [devTools.enhancer()] : []);

      // Enable syncing of Angular router state with our Redux store.
      if (ngReduxRouter) {
        ngReduxRouter.initialize();
      }

      // Enable syncing of Angular form state with our Redux store.
      provideReduxForms(store);

      // Initialize thing that have to be initialize
    AppStoreInitializer.initialize(friendshipService, friendshipControlService);
      // friendshipService.keepSubcribe();
    }

}
