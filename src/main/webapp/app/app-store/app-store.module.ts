import { provideReduxForms } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { createLogger } from 'redux-logger';

import { createEpics } from './app-store/app.epics';
import { AppStoreInitializer } from './app-store/app.initialize';
import { rootReducer } from './app-store/app.reducers';
import { AppStoreState, INITIAL_APP_STORE } from './app-store/app.store.model';
import { FriendshipService } from './friendship.service';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule, NgReduxRouterModule],
  providers: [FriendshipService],
  declarations: []
})
export class AppStoreModule {
  constructor(public store: NgRedux<AppStoreState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    friendshipService: FriendshipService
  ) {
      store.configureStore(
        rootReducer(friendshipService),
        INITIAL_APP_STORE,
        [createLogger(), /*...createEpics(friendshipService)*/],
        devTools.isEnabled() ? [devTools.enhancer()] : []);

      // Enable syncing of Angular router state with our Redux store.
      if (ngReduxRouter) {
        ngReduxRouter.initialize();
      }

      // Enable syncing of Angular form state with our Redux store.
      provideReduxForms(store);

      // Initialize thing that have to be initialize
      // AppStoreInitializer.initialize(friendshipService);

      friendshipService.keepSubcribe();
    }

}
