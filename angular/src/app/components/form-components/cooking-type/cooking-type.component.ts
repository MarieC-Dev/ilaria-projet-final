import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { CookingType, CookingTypeList } from '../../../models/cooking-type.model';
import { COOKING_TYPE_LIST } from '../../../lists/cooking-type-list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cooking-type',
  imports: [MultipleInputsComponent, FormsModule],
  templateUrl: './cooking-type.component.html',
  styleUrl: './cooking-type.component.scss'
})
export class CookingTypeComponent implements OnInit {
  cookingTypeList = signal(COOKING_TYPE_LIST);
  @Input() checkbox: string = '';
  @Output() checkboxChange = new EventEmitter<string>();

  ngOnInit(): void {}

  onInput(event: Event): void {
    const check = event.target as HTMLInputElement;
    this.checkboxChange.emit(check.value);
  }

  onCheckboxChange(type: CookingType) {
    // Si 1 type est sélectionné, unchecked les autres
    const findOtherElm = this.cookingTypeList().filter(elm => elm.inputId !== type.inputId);

    for (let i = 0; i < findOtherElm.length; i++) {
      findOtherElm[i].checked = false;
    }
  }

}
