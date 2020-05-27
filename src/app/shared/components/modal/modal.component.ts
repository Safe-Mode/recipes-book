import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  @Input() message: string;

  onModalClose(): void {
    this.closed.emit();
  }

}
