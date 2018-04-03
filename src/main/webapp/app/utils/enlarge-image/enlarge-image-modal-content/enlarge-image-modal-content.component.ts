import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enlarge-image-modal-content',
  templateUrl: './enlarge-image-modal-content.component.html',
  styles: []
})
export class EnlargeImageModalContentComponent {

  @Input('imageSrc') imageSrc;
  @Input('imageContentType') imageContentType;
  constructor(public activeModal: NgbActiveModal) { }

  get url() {
    return `data:${this.imageContentType};base64,${this.imageSrc}`;
  }
}
