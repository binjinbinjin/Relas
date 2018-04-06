import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-url-image',
  templateUrl: './display-url-image.component.html',
  styles: []
})
export class DisplayUrlImageComponent {
  /**image type */
  @Input('imageUrl') imageUrl;
  /**reference of open modal */
  elemRef: NgbModalRef;
  constructor(private modalService: NgbModal) { }

  /**Open the modal */
  open(content) {
    this.elemRef = this.modalService.open(content);
  }

  /**Close the modal */
  close() {
    if (this.elemRef == null)
      return;
    this.elemRef.close();
    this.elemRef = null;
  }

}
