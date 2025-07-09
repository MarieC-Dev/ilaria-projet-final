import {Component, input, model, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCommentAnswersDirective } from '../../directives/show-comment-answers.directive';
import {UsersApiService} from '../../services/users-api.service';

@Component({
  selector: 'app-recipe-comment',
  imports: [CommonModule, ShowCommentAnswersDirective],
  templateUrl: './recipe-comment.component.html',
  styleUrl: './recipe-comment.component.scss'
})
export class RecipeCommentComponent implements OnInit {
  userId = input<number>();
  date = input<string>();
  note = input<number>();
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

  getStars(solid: boolean) {
    const lastChar: string = String(this.note).charAt(String(this.note).length - 2);
    const nb: number = parseInt(lastChar);

    if(nb > 0 && nb <= 5) {
      const array = [];

      for(let i = 0; i < nb; i++) {
        array.push(`${i}`);
      }

      if(solid) {
        return array;
      } else {
        return array.splice(0, 5 - array.length);
      }
    } else {
      return;
    }
  }
}
