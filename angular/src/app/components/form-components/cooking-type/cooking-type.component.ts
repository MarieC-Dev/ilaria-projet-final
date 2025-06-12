import {
  Component,
  ElementRef, EventEmitter,
  Input, Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import {COOKING_TYPE_LIST} from '../../../lists/cooking-type-list';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-cooking-type',
  imports: [MultipleInputsComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './cooking-type.component.html',
  styleUrl: './cooking-type.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CookingTypeComponent {
  cookingTypeList = signal(COOKING_TYPE_LIST);
  //@Input() controlName!: string;
  @Output() checkboxValue = new EventEmitter<string>();
  @ViewChild('checkboxList') checkboxList!: ElementRef;

  onCheckBtn(type: any) {
    type.checked = !type.checked;

    const findOtherElm = this.cookingTypeList().filter(elm => elm.inputId !== type.inputId);

    for (let j = 0; j < findOtherElm.length; j++) {
      findOtherElm[j].checked = false;
    }

    this.checkboxValue.emit(type.value);
  }
}
