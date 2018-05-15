import { feedMainRoute } from './feed-routes';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JhiDataUtils } from 'ng-jhipster';

import { Principal } from '../shared/auth/principal.service';
import { EachFeedComponent } from './display-feed/each-feed/each-feed.component';
import { FeedContentComponent } from './display-feed/feed-content/feed-content.component';
import { FeedsComponent } from './display-feed/feeds/feeds.component';
import { PostComponent } from './post/post/post.component';
import { FeedService } from './service/feed.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(feedMainRoute),
  ],
  declarations: [PostComponent, FeedsComponent, EachFeedComponent, FeedContentComponent],
  exports: [PostComponent, FeedsComponent, EachFeedComponent, FeedContentComponent],
  providers: [JhiDataUtils, Principal, FeedService],
})
export class FeedModule { }
