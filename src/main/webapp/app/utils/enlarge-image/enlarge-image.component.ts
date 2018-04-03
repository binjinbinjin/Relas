import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnlargeImageModalContentComponent } from './enlarge-image-modal-content/enlarge-image-modal-content.component';

/**This component contain some bug, do not use before finish */
@Component({
  selector: 'app-enlarge-image',
  templateUrl: './enlarge-image.component.html',
  styles: []
})
export class EnlargeImageComponent {

  /**image data */
  @Input('imageSrc') imageSrc;
  /**image type */
  @Input('imageContentType') imageContentType;
  /**record is status of modal */
  isModalOpen: boolean;

  constructor(private modalService: NgbModal) {
    this.isModalOpen = false;
  }

  /**If input is true then open the modal */
  @Input('open') set open(open: boolean) {
    if (this.isModalOpen === false && open === true) {
      this.isModalOpen = true;
      this.openModal();
    }
  }

  /**Open modal */
  openModal() {
    const modalRef = this.modalService.open(EnlargeImageModalContentComponent);
    modalRef.componentInstance.imageSrc = this.imageSrc;
    modalRef.componentInstance.imageContentType = this.imageContentType;
    modalRef.result.then((res) => {
      // notetify when modal is close
      this.isModalOpen = false;
    }).catch();
  }
}
