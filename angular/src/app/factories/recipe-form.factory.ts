import { Injectable } from '@angular/core';
import {FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RecipeFormFactory {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl<string>(''),
      imageName: new FormControl<string>(''),
      imageData: new FormControl<string>(''),
      cuisineType: new FormControl<string>('', Validators.required), // return string
      cookingType: new FormControl<string>('', Validators.required), // No cooking by default
      servingNumber: new FormGroup({
        number: new FormControl<string>('', Validators.required),
        type: new FormControl<string>('', Validators.required),
      }), // [ number, string ]
      difficulty: new FormControl<string>('', Validators.required),

      recipeTime: new FormGroup({
        making: new FormGroup({
          hours: new FormControl<string>('', Validators.required),
          minutes: new FormControl<string>('', Validators.required),
        }),
        cooking: new FormGroup({
          hours: new FormControl<string>(''),
          minutes: new FormControl<string>(''),
        }),
        pause: new FormGroup({
          hours: new FormControl<string>(''),
          minutes: new FormControl<string>(''),
        }),
      }),

      ingredientDetail: new FormGroup({
        quantity: new FormControl<string>(''),
        unit: new FormControl<string>(''),
        name: new FormControl<string>(''),
      }),
      ingredientsList: new FormArray([], [Validators.required, Validators.minLength(2)]),

      stepDetail: new FormGroup({
        number: new FormControl<string>(''),
        stepName: new FormControl<string>(''),
      }),
      stepsList: new FormArray([], [Validators.required, Validators.minLength(2)]),
      //created: new FormControl<Date|number>(Date.now(), Validators.required),
    });
  }
}
