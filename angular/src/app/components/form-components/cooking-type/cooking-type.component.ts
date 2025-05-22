import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { CookingType, CookingTypeList } from '../../../models/cooking-type.model';
import { COOKING_TYPE_LIST } from '../../../lists/cooking-type-list';
import {
  ControlContainer,
  FormControl,
  FormControlName,
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
  @Input() cookingTypeControl!: FormControl;
  @Output() checkboxChange = new EventEmitter<string>();

  constructor(private controlContainer: ControlContainer) {}

  onCheck(type: CookingType) {
    const findOtherElm = this.cookingTypeList().filter(elm => elm.inputId !== type.inputId);
    type.checked = !type.checked;

    for (let i = 0; i < findOtherElm.length; i++) {
      findOtherElm[i].checked = false;
    }

    if(type.checked) {
      this.controlContainer.control?.get('cookingType')?.setValue(type.inputId);
      console.log(this.controlContainer.control?.value);
    }
  }
}
