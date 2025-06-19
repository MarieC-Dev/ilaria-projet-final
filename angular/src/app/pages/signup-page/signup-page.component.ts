import {Component, inject, OnInit, signal} from '@angular/core';
import { SIGNUP } from '../../lists/signin-signup-list';
import {UsersApiService} from '../../services/users-api.service';
import {formatDate, JsonPipe, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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

  constructor(private usersApiService: UsersApiService, private router: Router) { }

  ngOnInit() {
    this.userForm = new UserFormFactory();
  }

  onSubmit() {
    this.userForm.formGroupCreate.get('created')?.setValue(this.createdDate.datetime);

    this.usersApiService.createUser(this.userForm.formGroupCreate.value).subscribe({
      next: (response) => {
        console.log('Utilisateur créé :', response)
        this.router.navigate(['/admin/mes-infos'])
      },
      error: (err) => console.error('Erreur FRONT :', err)
    });
  }
}
