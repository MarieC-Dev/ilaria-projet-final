import {Component, inject, OnInit, signal} from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import {UsersApiService} from '../../services/users-api.service';
import {formatDate, JsonPipe, NgIf} from '@angular/common';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFormFactory} from '../../factories/user-form.factory';
import {DatetimeService} from '../../services/datetime.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnInit {
  userForm!: UserFormFactory;
  createdDate = inject(DatetimeService);
  data: any[] = [];
  selectedImage: File | null = null;

  constructor(
    private usersApiService: UsersApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = new UserFormFactory()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.selectedImage = input.files[0];

      this.userForm.formGroupCreate.get('imageName')?.setValue(this.selectedImage.name);

      formData.append('user-image', this.selectedImage);
    }
  }

  buildFormDataFormGroup(formGroup: FormGroup, file: File | any): FormData {
    const formData = new FormData();

    formData.append('username', formGroup.get('username')?.value);
    formData.append('email', formGroup.get('email')?.value);
    formData.append('password', formGroup.get('password')?.value);
    formData.append('created', formGroup.get('created')?.value);

    // Image
    formData.append('user-image', file); // ce nom doit correspondre à multer.single('recipe-image')
    formData.append('imageName', file.name);

    return formData;
  }

  onSubmit() {
    this.userForm.formGroupCreate.get('created')?.setValue(this.createdDate.datetime);

    const formData = this.buildFormDataFormGroup(this.userForm.formGroupCreate, this.selectedImage);

    this.usersApiService.createUser(formData).subscribe(() => {
      this.userForm.formGroupCreate.patchValue({
        imageName: '',
        username: '',
        email: '',
        password: '',
        created: ''
      });
      console.log('success');
    });
  }
}
