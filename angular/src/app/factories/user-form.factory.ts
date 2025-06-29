import {Injectable} from '@angular/core';
import {FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserFormFactory {
  formGroupCreate: FormGroup;
  formGroupLogin: FormGroup;

  constructor() {
    this.formGroupCreate = new FormGroup({
      imageName: new FormControl<string>(''),
      imageData: new FormControl<string>(''),
      username: new FormControl<string>(''),
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
      created: new FormControl<string>('')
    });

    this.formGroupLogin = new FormGroup({
      email: new FormControl<string>(''),
      password: new FormControl<string>('')
    });
  }
}
