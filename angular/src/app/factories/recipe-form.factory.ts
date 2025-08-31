import {Injectable} from '@angular/core';
import {FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RecipeFormFactory {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl<string>(''),
      imageName: new FormControl<string>('', Validators.required),
      imageData: new FormControl(),
      cuisineType: new FormControl<string>('', Validators.required),
      cookingType: new FormControl<string>('', Validators.required),
      servingNumber: new FormGroup({
        number: new FormControl<string>('', Validators.required),
        type: new FormControl<string>('', Validators.required),
      }),
      difficulty: new FormControl<string>('', Validators.required),

      recipeTime: new FormGroup({
        making: new FormGroup({
          type: new FormControl<string>('making'),
          hours: new FormControl<string>('', Validators.required),
          minutes: new FormControl<string>('', Validators.required),
        }),
        cooking: new FormGroup({
          type: new FormControl<string>('cooking'),
          hours: new FormControl<string>('0'),
          minutes: new FormControl<string>('0'),
        }),
        pause: new FormGroup({
          type: new FormControl<string>('pause'),
          hours: new FormControl<string>('0'),
          minutes: new FormControl<string>('0'),
        }),
      }),

      ingredientDetail: new FormGroup({
        quantity: new FormControl<string>(''),
        unit: new FormControl<string>(''),
        ingredient: new FormControl<string>(''),
      }),
      ingredientsList: new FormArray([], [Validators.required, Validators.minLength(1)]),

      stepDetail: new FormGroup({
        number: new FormControl<string>(''),
        stepName: new FormControl<string>(''),
      }),
      stepsList: new FormArray([], [Validators.required, Validators.minLength(1)]),
      authorId: new FormControl<number>(0, Validators.required),
      created: new FormControl<string>(''),
    });
  }
}
