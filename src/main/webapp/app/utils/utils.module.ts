import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DisplayServiceImageComponent } from './display-service-image/display-service-image.component';
import {
  EnlargeImageModalContentComponent,
} from './enlarge-image/enlarge-image-modal-content/enlarge-image-modal-content.component';
import { EnlargeImageComponent } from './enlarge-image/enlarge-image.component';
import { DisplayUrlImageComponent } from './display-url-image/display-url-image.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],

  declarations: [EnlargeImageComponent,
                  EnlargeImageModalContentComponent,
                  DisplayServiceImageComponent,
                  DisplayUrlImageComponent],

  providers: [],

  exports: [EnlargeImageComponent, DisplayServiceImageComponent, DisplayUrlImageComponent],

  entryComponents: [EnlargeImageModalContentComponent]
})
export class UtilsModule { }
