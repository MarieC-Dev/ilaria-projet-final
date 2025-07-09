import {Component, ElementRef, OnChanges, OnInit, signal, SimpleChanges, ViewChild} from '@angular/core';
import {JsonPipe, Location} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommentFormFactory} from '../../factories/comment-form.factory';
import {StarIconComponent} from '../../components/icons/star-icon/star-icon.component';
import {StarBorderIconComponent} from '../../components/icons/star-border-icon/star-border-icon.component';
import {CommentApiService} from '../../services/comment-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersApiService} from '../../services/users-api.service';
import {IsLoggedInService} from '../../services/isLoggedIn.service';
import {DatetimeService} from '../../services/datetime.service';

@Component({
  selector: 'app-recipe-comment-page',
  imports: [
    ReactiveFormsModule,
    StarIconComponent,
    StarBorderIconComponent,
    JsonPipe
  ],
  templateUrl: './recipe-comment-page.component.html',
  styleUrl: './recipe-comment-page.component.scss'
})
export class RecipeCommentPageComponent implements OnInit {
  commentForm!: CommentFormFactory;
  index: number = 1;

  noteCheckboxItem = [
    {
      checkboxName: 'recipeStar' + this.index,
      value: this.index++,
      checked: false,
    }, {
      checkboxName: 'recipeStar' + this.index,
      value: this.index++,
      checked: false,
    }, {
      checkboxName: 'recipeStar' + this.index,
      value: this.index++,
      checked: false,
    }, {
      checkboxName: 'recipeStar' + this.index,
      value: this.index++,
      checked: false,
    }, {
      checkboxName: 'recipeStar' + this.index,
      value: this.index++,
      checked: false,
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private commentApi: CommentApiService,
    private isLoggedIn: IsLoggedInService,
    private dateService: DatetimeService
  ) { }

  ngOnInit(): void {
    this.commentForm = new CommentFormFactory();
    this.commentForm.formGroup.get('recipeId')?.setValue(
      Number(this.route.snapshot.paramMap.get('id'))
    );
    this.isLoggedIn.isLoggedIn().subscribe({
      next: (result) => {
        this.commentForm.formGroup.get('userId')?.setValue(result.user.id)
      },
      error: (err) => console.log(err)
    });
  }

  goBack() {
    this.location.back();
  }

  handleCheckbox(event: MouseEvent) {
    event.preventDefault();
  }

  onCheckStars(elm: any) {
    let indexOfCheckbox = this.noteCheckboxItem.indexOf(elm);
    this.noteCheckboxItem.filter((item) => item.checked = false);

    for (let i = 0; i <= indexOfCheckbox; i++) {
      this.noteCheckboxItem[i].checked = true;
    }
    this.commentForm.formGroup.get('note')?.setValue(elm.value);
  }

  onSubmit() {
    this.commentForm.formGroup.get('created')?.setValue(this.dateService.datetime);

    this.commentApi.createComment(this.commentForm.formGroup.value).subscribe({
      next: (result) => window.location.reload(),
      error: (err) => console.log(err),
      complete: () => {
        console.log('ℹ️ Requête terminée');
      }
    })
  }
}
