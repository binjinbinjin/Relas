import { LoginModalService } from './../../shared/login/login-modal.service';
import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/**This compoent is use to dispaly image with max-height: 50px; max-width: 100%,
 * and a modal will dispaly to enlarge the image by click
 */
@Component({
  selector: 'app-display-service-image',
  templateUrl: './display-service-image.component.html',
  styles: []
})
export class DisplayServiceImageComponent {
  /**image data */
  @Input('imageContentType') imageContentType;
  /**image type */
  @Input('imageSrc') imageSrc;
  /**reference of open modal */
  elemRef: NgbModalRef;
  constructor(private modalService: NgbModal) {}

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
