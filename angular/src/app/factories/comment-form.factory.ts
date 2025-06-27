import {Injectable} from '@angular/core';
import {FormGroup, FormArray, Validators, FormControl} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CommentFormFactory {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      note: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
      commentText: new FormControl<string>('')
    });
  }
}
