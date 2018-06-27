import { provideReduxForms } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { UserPortfolioService } from '../user-portfolio/user-portfolio-service/user-portfolio.service';
import { UserPortfolioModule } from '../user-portfolio/user-portfolio.module';
import { /*createEpics,*/ EpicsMiddleWares } from './app-store/app.epics';
import { AppStoreInitializer } from './app-store/app.initialize';
import { rootReducer } from './app-store/app.reducers';
import { AppStoreState, INITIAL_APP_STORE } from './app-store/app.store.model';
import { ChatRoomService } from './service/chat-room.service';
import { ChatSocketService } from './service/chat-socket.service';
import { FriendshipControlService } from './service/friendshipControl.service';
import { FriendshipRequestService } from './service/friendshipRequest.service';
import { UnreadChatMessageService } from './service/unread-chat-message.service';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule,
    UserPortfolioModule,
    RouterModule
  ],
  providers: [
    FriendshipRequestService,
    FriendshipControlService,
    ChatRoomService,
    ChatSocketService,
    UnreadChatMessageService,
  ],
  exports: [],
  declarations: []
})
export class AppStoreModule {
  constructor(public store: NgRedux<AppStoreState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    friendshipService: FriendshipRequestService,
    friendshipControlService: FriendshipControlService,
    chatSocket: ChatSocketService,
    portfolioService: UserPortfolioService,
    chatRoomService: ChatRoomService,
    unreadMessagService: UnreadChatMessageService,
    router: Router
  ) {
    const middleWares = new EpicsMiddleWares(friendshipService, friendshipControlService, portfolioService, chatSocket, chatRoomService, unreadMessagService);
      store.configureStore(
        rootReducer(friendshipService, friendshipControlService, chatSocket, unreadMessagService, router),
        INITIAL_APP_STORE,
        [/*createLogger(), */...middleWares.middleWares],
        devTools.isEnabled() ? [devTools.enhancer()] : []);

      // Enable syncing of Angular router state with our Redux store.
      if (ngReduxRouter) {
        ngReduxRouter.initialize();
      }

      // Enable syncing of Angular form state with our Redux store.
      provideReduxForms(store);

      middleWares.runMiddleWare();

      // Initialize thing that have to be initialize
      AppStoreInitializer.initialize();
      // friendshipService.keepSubcribe();
    }

}
