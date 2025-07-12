import {Component, input, OnInit, output} from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";
import {FavoriteApiService} from '../../services/favorite-api.service';
import {RouterLink} from '@angular/router';
import {CommentApiService} from '../../services/comment-api.service';
import {RecipeAverageService} from '../../services/recipe-average.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-recipe-item',
  imports: [HeartIconComponent, RouterLink, JsonPipe],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent implements OnInit {
  id = input<number>();
  picture = input<string>();
  name = input<string>();
  average = input<any>();
  numberOfVotes = input<number|undefined>();
  authorName = input<string>();
  recipeId = input<number>();
  userId = input<number>();

  recipeComments!: any[];

  constructor(
    private favoriteApi: FavoriteApiService,
    private commentsApi: CommentApiService,
    private recipeAverage: RecipeAverageService
  ) { }

  ngOnInit(): void {
    this.commentsApi.getCommentsByRecipeId(Number(this.recipeId())).subscribe({
      next: (result) => {
        this.recipeComments = result.rows;
      },
      error: (err) => console.log(err)
    });
  }

  handleFavorite(event: Event) {
    event.preventDefault();

    const favorite = {
      recipeId: this.recipeId(),
      userId: this.userId()
    }

    this.favoriteApi.addFavorite(favorite).subscribe({
      next: (result) => console.log(result),
      error: (err) => console.log('POST favorite error', err)
    })
  }

  getNoteAverage() {
    return this.recipeAverage.getRecipeAverage(Number(this.recipeId()), this.recipeComments);
  }
}
