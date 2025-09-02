import {Component, EventEmitter, Input, input, OnChanges, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";
import { FavoriteApiService } from '../../services/favorite-api.service';
import { RouterLink } from '@angular/router';
import { CommentApiService } from '../../services/comment-api.service';
import { RecipeAverageService } from '../../services/recipe-average.service';
import { JsonPipe } from '@angular/common';
import { HeartBorderIconComponent } from '../icons/heart-border-icon/heart-border-icon.component';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { switchMap } from 'rxjs';
import { SlugifyForRoutageService } from '../../services/slugify-for-routage.service';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [HeartIconComponent, RouterLink, JsonPipe, HeartBorderIconComponent],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent implements OnInit, OnChanges {
  @Input() id!: number;
  @Input() picture!: string;
  @Input() name!: string;
  @Input() average!: any;
  @Input() numberOfVotes?: number;
  @Input() authorName!: string;
  @Input() recipeId!: number;
  @Input() userId!: number;
  @Input() isFavorite: boolean = false;
  @Output() favoriteAdded = new EventEmitter<number>();
  @Output() favoriteDeleted = new EventEmitter<number>();

  localIsFavorite: boolean = false;

  constructor(
    protected slugify: SlugifyForRoutageService
  ) {}

  ngOnInit(): void {
    this.localIsFavorite = this.isFavorite;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFavorite']) {
      this.localIsFavorite = changes['isFavorite'].currentValue;
    }
  }

  addFavorite() {
    this.favoriteAdded.emit();
    this.localIsFavorite = true;
  }

  deleteFavorite() {
    this.favoriteDeleted.emit();
    this.localIsFavorite = true;
  }
}
