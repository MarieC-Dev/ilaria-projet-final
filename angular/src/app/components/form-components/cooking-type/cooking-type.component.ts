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
  @Input() checkbox: string[] = [];
  @Output() checkboxChange = new EventEmitter<string[]>();

  ngOnInit(): void {}

  onInput(event: Event): void {
    const check = event.target as HTMLInputElement;
    console.log(check.checked);
    console.log(this.cookingTypeList());
    //this.checkboxChange.emit(check.value);
  }

  onCheckboxChange(type: CookingType) {
    // Si type 'no-cooking' est checked -> décoche tous sauf lui
    if(type.inputId === 'no-cooking') {
      if(type.checked) {
        const findOtherType = this.cookingTypeList().filter(elm => elm.inputId !== 'no-cooking');

        for (let i = 0; i < findOtherType.length; i++) {
          findOtherType[i].checked = false;
        }
      }
    } else {
      const findNoCooking: CookingType | any = this.cookingTypeList().find(elm => elm.inputId === 'no-cooking');
      findNoCooking.checked = false;
    }
  }

}
