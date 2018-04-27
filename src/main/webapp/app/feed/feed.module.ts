import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post/post.component';
import { FeedsComponent } from './display-feed/feeds/feeds.component';
import { EachFeedComponent } from './display-feed/each-feed/each-feed.component';
import { FeedContentComponent } from './display-feed/feed-content/feed-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PostComponent, FeedsComponent, EachFeedComponent, FeedContentComponent]
})
export class FeedModule { }
