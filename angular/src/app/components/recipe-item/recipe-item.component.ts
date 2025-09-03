import {Component, EventEmitter, Input, input, OnChanges, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import { HeartIconComponent } from "../icons/heart-icon/heart-icon.component";
import { FavoriteApiService } from '../../services/favorite-api.service';
import { RouterLink } from '@angular/router';
import { CommentApiService } from '../../services/comment-api.service';
import { RecipeAverageService } from '../../services/recipe-average.service';
import {JsonPipe, NgIf} from '@angular/common';
import { HeartBorderIconComponent } from '../icons/heart-border-icon/heart-border-icon.component';
import { IsLoggedInService } from '../../services/isLoggedIn.service';
import { switchMap } from 'rxjs';
import { SlugifyForRoutageService } from '../../services/slugify-for-routage.service';
import {DeleteIconComponent} from '../icons/delete-icon/delete-icon.component';
import {PopUpComponent} from '../pop-up/pop-up.component';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [HeartIconComponent, RouterLink, JsonPipe, HeartBorderIconComponent, DeleteIconComponent, NgIf, PopUpComponent],
  templateUrl: './recipe-item.component.html',
  styleUrl: '../../../styles.scss'
})
export class RecipeItemComponent implements OnInit, OnChanges {
  @Input() showRecipesAdmin: boolean = false;
  @Input() id!: number;
  @Input() picture!: string;
  @Input() name!: string;
  @Input() average!: any;
  @Input() numberOfVotes?: number;
  @Input() authorName!: string;
  @Input() recipeId!: number;
  @Input() userId!: number;
  @Input() isFavorite: boolean = false;
  @Input() showPopUp: boolean = false;

  @Output() favoriteAdded = new EventEmitter<number>();
  @Output() favoriteDeleted = new EventEmitter<number>();

  @Output() adminDeleteRecipe = new EventEmitter<any>();
  @Output() adminShowPopUp = new EventEmitter<boolean>();
  @Output() adminShowPopUpFalse = new EventEmitter<boolean>();

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

  deleteRecipe() {
    return this.adminDeleteRecipe.emit();
  }

  showPopUpBool() {
    return this.adminShowPopUp.emit();
  }

  showPopUpFalse() {
    return this.adminShowPopUpFalse.emit();
    /*this.showPopUp = false;
    return this.showPopUp;*/
  }
}
