import {Component, input, OnInit, signal} from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";
import {FavoriteApiService} from '../../services/favorite-api.service';
import {RouterLink} from '@angular/router';
import {CommentApiService} from '../../services/comment-api.service';
import {RecipeAverageService} from '../../services/recipe-average.service';
import {JsonPipe} from '@angular/common';
import {HeartBorderIconComponent} from '../icons/heart-border-icon/heart-border-icon.component';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {switchMap} from 'rxjs';
import {SlugifyForRoutageService} from '../../services/slugify-for-routage.service';

@Component({
  selector: 'app-recipe-item',
  imports: [HeartIconComponent, RouterLink, JsonPipe, HeartBorderIconComponent],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent implements OnInit {
  id = input<number>();
  picture = input<string>();
  name = input<string>('');
  average = input<any>();
  numberOfVotes = input<number|undefined>();
  authorName = input<string>();
  recipeId = input<number>();
  userId = input<number>();
  isFavorite = signal(false);

  userLoggedInData!: any;
  favorites!: any[];
  recipeComments!: any[];
  noteAverage!: number;
  numberOfNote!: number;

  constructor(
    private commentsApi: CommentApiService,
    private favoriteApi: FavoriteApiService,
    private recipeAverage: RecipeAverageService,
    private userLoggedIn: IsLoggedInService,
    protected slugify: SlugifyForRoutageService
  ) { }

  ngOnInit(): void {
    this.userLoggedIn.isLoggedIn().pipe(
      switchMap((res1) => {
        this.userLoggedInData = res1.user;
        return this.commentsApi.getCommentsByRecipeId(Number(this.recipeId()))
      }),
    ).subscribe((res2) => {
      this.recipeComments = res2.rows;
      this.noteAverage = this.recipeAverage.getRecipeAverage(
        Number(this.recipeId()), res2.rows
      );
      this.numberOfNote = res2.rows.length;
    });
    /*this.userLoggedIn.isLoggedIn().pipe(
      switchMap((res1) => {
        this.userLoggedInData = res1.user;
        return this.commentsApi.getCommentsByRecipeId(Number(this.recipeId()))
      }),
      switchMap((res2) => {
        this.recipeComments = res2.rows;
        this.noteAverage = this.recipeAverage.getRecipeAverage(
          Number(this.recipeId()), res2.rows
        );
        this.numberOfNote = res2.rows.length;

        return this.favoriteApi.getAllFavorites();
      })
    ).subscribe((res3) => {
      this.favorites = res3.rows;

      const findUserFavorite = this.favorites.some(
        (fav) =>
          fav.userId === this.userLoggedInData?.id &&
          fav.recipeId === Number(this.recipeId())
      );

      this.isFavorite.set(findUserFavorite);
    });*/
  }

  addFavorite() {
    const favoriteData = {
      userId: this.userLoggedInData.id,
      recipeId: Number(this.recipeId())
    };

    /*this.favoriteApi.addFavorite(favoriteData).subscribe({
      next: (result) => {
        this.favorites = [...this.favorites, result.rows];
        this.isFavorite.set(true);
      },
      error: (err) => {
        console.log('POST favorite error', err);
      }
    })*/
  }

  deleteFavorite() {
    const fav = this.favorites.find(
      (f) =>
        f.userId === this.userLoggedInData.id &&
        f.recipeId === Number(this.recipeId())
    );

    if (!fav) return;

    this.favoriteApi.deleteFavorite(fav.id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((f) => f.id !== fav.id);
        this.isFavorite.set(false); // ✅ mise à jour directe
      },
      error: (err) => console.log('DELETE favorite error', err)
    });
  }

}
