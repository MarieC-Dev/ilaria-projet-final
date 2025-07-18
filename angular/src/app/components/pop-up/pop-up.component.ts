import {Component, Output, Input, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-pop-up',
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() labelName!: string;
  @Input() isShow!: boolean;
  @Output() deleteFunction = new EventEmitter<void>();
  @Output() cancelFunction = new EventEmitter<void>();

  onDelete() {
    this.deleteFunction.emit();
  }

  onCancel() {
    this.cancelFunction.emit()
  }
}
