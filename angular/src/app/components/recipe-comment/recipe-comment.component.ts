import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-comment',
  imports: [CommonModule],
  templateUrl: './recipe-comment.component.html',
  styleUrl: './recipe-comment.component.scss'
})
export class RecipeCommentComponent {
  picture = input<string>('');
  username = input<string>('');
  date = input<Date>();
  note = input<number>();
  text = input<string>('');

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

  /*
    Si la note est entre 1 et 5 -> 
      - nb x <img src="star.svg" alt="star icon">
      - reste avec <img src="star-border.svg" alt="star icon">
    (switch ?)
    Sinon -> ...
  */
}
