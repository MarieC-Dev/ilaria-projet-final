import { Injectable } from '@angular/core';
import {FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RecipeFormFactory {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>(''),
      imageName: new FormControl<string>(''),
      imageData: new FormControl<string>(''),
      cuisineType: new FormControl<string>('', Validators.required), // return string
      cookingType: new FormControl<string>('', Validators.required), // No cooking by default
      servingNumber: new FormGroup({
        number: new FormControl<number>(0, Validators.required),
        type: new FormControl<string>('', Validators.required),
      }), // [ number, string ]
      difficulty: new FormControl<string>('', Validators.required),

      hasCookingTime: new FormControl<boolean>(false, Validators.required),
      hasPauseTime: new FormControl<boolean>(false, Validators.required),

      recipeTime: new FormGroup({
        making: new FormGroup({
          hours: new FormControl<number>(0, Validators.required),
          minutes: new FormControl<number>(0, Validators.required),
        }),
        cooking: new FormGroup({
          hours: new FormControl<number>(0),
          minutes: new FormControl<number>(0),
        }),
        pause: new FormGroup({
          hours: new FormControl<number>(0),
          minutes: new FormControl<number>(0),
        }),
      }),

      ingredientsList: new FormArray([]),
      ingredientDetail: new FormGroup({
        quantity: new FormControl<number>(0),
        unit: new FormControl<string>(''),
        name: new FormControl<string>(''),
      }),

      stepsList: new FormArray([]),
      stepDetail: new FormGroup({
        number: new FormControl<number>(0),
        stepName: new FormControl<string>(''),
      }),
      created: new FormControl<Date|number>(Date.now(), Validators.required),
    });
  }
}
