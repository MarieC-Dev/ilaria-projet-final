import {Component, OnInit, signal} from '@angular/core';
import {HeaderProfileComponent} from "../../layout/header-profile/header-profile.component";
import {Location, NgIf} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {UserFormFactory} from '../../factories/user-form.factory';
import {RECIPE_LIST} from '../../lists/recipe-list.fake';
import {UsersApiService} from '../../services/users-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-edit-user-page',
  imports: [
    HeaderProfileComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './admin-edit-user-page.component.html',
  styleUrl: './admin-edit-user-page.component.scss'
})
export class AdminEditUserPageComponent implements OnInit {
  userForm!: UserFormFactory;
  recipesList = signal(RECIPE_LIST);
  userId!: number;
  userImage: File | null = null;

  constructor(
    private userApi: UsersApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.userForm = new UserFormFactory();
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    this.userApi.getOneUser(this.userId).subscribe((res) => {
      const data = res.profile[0];
      this.userForm.formGroupCreate.patchValue({
        imageName: data.imageName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.roleId,
      });
    });
  }

  goBack() {
    this.location.back();
  }

  get username(): string {
    return this.userForm.formGroupCreate.get('username')?.value;
  }

  get profileImage(): string {
    return this.userForm.formGroupCreate.get('imageName')?.value;
  }

  removeProfileImage() {
    this.userForm.formGroupCreate.get('imageName')?.setValue('');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const formData = new FormData();
      this.userImage = input.files[0];

      this.userForm.formGroupCreate.get('imageName')?.setValue(this.userImage.name);

      formData.append('recipe-image', this.userImage);
    }
  }

  buildFormDataFormGroup(formGroup: FormGroup, file: File| any): FormData {
    const formData = new FormData();

    formData.append('imageName', formGroup.get('imageName')?.value);
    formData.append('username', formGroup.get('username')?.value);
    formData.append('role', formGroup.get('role')?.value);
    formData.append('email', formGroup.get('email')?.value);
    formData.append('password', formGroup.get('password')?.value);

    if (file) {
      formData.append('user-image', file);
      formData.append('imageName', file.name);
    }

    return formData;
  }

  onSubmit() {
    const formData = this.buildFormDataFormGroup(this.userForm.formGroupCreate, this.userImage);

    this.userApi.updateUser(this.userId, formData).subscribe({
      next: (result) => window.location.reload(),
      error: (err) => console.log('Err Front update profile', err)
    });
  }
}
