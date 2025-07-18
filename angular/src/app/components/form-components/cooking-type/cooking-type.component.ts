import {
  Component,
  ElementRef, EventEmitter,
  Input, OnInit, Output,
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
import {NgIf} from '@angular/common';
import {RecipesApiService} from '../../../services/recipes-api.service';

@Component({
  selector: 'app-cooking-type',
  imports: [MultipleInputsComponent, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './cooking-type.component.html',
  styleUrl: './cooking-type.component.scss',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class CookingTypeComponent implements OnInit {
  cookingTypeList = signal(COOKING_TYPE_LIST);
  @Input() recipeId!: number;
  @Input() ifInvalidControl!: string[];
  @Output() checkboxValue = new EventEmitter<string>();

  constructor(private recipeApi: RecipesApiService) { }

  ngOnInit(): void {
    this.recipeApi.getOneRecipe(this.recipeId).subscribe((recipe) => {
      if(recipe[0].cookingType) {
        const findType = this.cookingTypeList().find((type) => type.value === recipe[0].cookingType)!;
        findType.checked = true;
      }
    })
  }

  onCheckBtn(type: any) {
    type.checked = !type.checked;

    const findOtherElm = this.cookingTypeList().filter(elm => elm.inputId !== type.inputId);

    for (let i = 0; i < findOtherElm.length; i++) {
      findOtherElm[i].checked = false;
    }

    this.checkboxValue.emit(type.value);
  }
}
