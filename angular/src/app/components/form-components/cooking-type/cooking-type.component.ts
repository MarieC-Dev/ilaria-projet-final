import {
  Component,
  ElementRef,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { CookingType } from '../../../models/cooking-type.model';
import { COOKING_TYPE_LIST } from '../../../lists/cooking-type-list';
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
  @Input() controlName!: string;
  @ViewChild('checkboxList') checkboxList!: ElementRef;
  @ViewChild('checkboxElm') checkboxElm!: ElementRef;

  constructor(private controlContainer: ControlContainer) {}

  onCheck(type: CookingType) {
    type.checked = !type.checked;

    const findOtherElm = this.cookingTypeList().filter(elm => elm.inputId !== type.inputId);

    for (let i = 0; i < findOtherElm.length; i++) {
      findOtherElm[i].checked = false;
    }

    console.log(this.checkboxList.nativeElement.children);
  }
}
