import {Component, ElementRef, OnChanges, OnInit, signal, SimpleChanges, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {CommentFormFactory} from '../../factories/comment-form.factory';
import {StarIconComponent} from '../../components/icons/star-icon/star-icon.component';
import {StarBorderIconComponent} from '../../components/icons/star-border-icon/star-border-icon.component';

@Component({
  selector: 'app-recipe-comment-page',
  imports: [
    ReactiveFormsModule,
    StarIconComponent,
    StarBorderIconComponent,
  ],
  templateUrl: './recipe-comment-page.component.html',
  styleUrl: './recipe-comment-page.component.scss'
})
export class RecipeCommentPageComponent implements OnInit {
  commentForm!: CommentFormFactory;
  //@ViewChild('checkboxList') checkboxList!: ElementRef;
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

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.commentForm = new CommentFormFactory();
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
    console.log('Comment is submit')

    // Si note est = 0 -> Error
  }

}
