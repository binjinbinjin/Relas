import { Component, OnInit, Input } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ChatMessageImageDisplayModel } from '../../../chat/model/chat-room.model';
import { FeedService } from '../../service/feed.service';
import { FeedModel } from '../../model/feed.model';

/**Component for post new feed */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('userId') id;
  /**Variable for wrapping the image data*/
  image: ChatMessageImageDisplayModel;

  constructor(private dataUtils: JhiDataUtils, private feedService: FeedService) {
    this.image = new ChatMessageImageDisplayModel(null, null);
  }
  /**Get image file from user */
  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  ngOnInit() {
  }

  /**Post new feed */
  post(text, imageData, imageType) {
    const feed = new FeedModel();
    feed.userIDId = this.id;
    feed.time = new Date();
    feed.message = text;
    feed.accessoryContentType = imageType;
    feed.accessory = imageData;
    this.feedService.create(feed).subscribe((res) => {

    });

  }
}
