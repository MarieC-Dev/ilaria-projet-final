import {Component, input, model, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCommentAnswersDirective } from '../../directives/show-comment-answers.directive';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-recipe-comment',
  imports: [CommonModule],
  templateUrl: './recipe-comment.component.html',
  styleUrl: './recipe-comment.component.scss'
})
export class RecipeCommentComponent implements OnInit {
  userId = input<number>();
  date = input<string>();
  note = input<number>(1);
  text = input<string>('');
  answersArray = input<number>(0);
  showAnswers = model(false); // input + output for change value

  userData!: any[];

  constructor(private usersApi: UsersApiService) { }

  ngOnInit(): void {
    const userId: number = Number(this.userId());
    this.usersApi.getOneUser(userId).subscribe({
      next: (result) => {
        this.userData = result.profile;
      },
      error: (err) => console.log(err)
    })
  }

  getStars(note: any) {
    const stars: boolean[] = [];
    const noteNb = Number(note);

    for (let i = 0; i < note; i++) {
      stars.push(true);
    }

    if(note < 5) {
      for (let i = 0; i < 5 - note; i++) {
        stars.push(false);
      }
    }

    return stars;
  }

}
