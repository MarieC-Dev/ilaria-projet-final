import { Component, model, OnInit, signal } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-difficulty',
  imports: [MultipleInputsComponent, FormsModule],
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.scss'
})
export class DifficultyComponent implements OnInit {
  index: number = 0;
  difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile'];
  difficultyValue = model(1);

  ngOnInit(): void {}

  getDifficulty() {   
    switch(this.difficultyValue()) {
      case 0:
        return 'Ne sais pas';
        break;
      case 1:
        return this.difficulties[0];
        break;
      case 2:
        return this.difficulties[1];
        break;
      case 3:
        return this.difficulties[2];
        break;
      case 4:
        return this.difficulties[3];
        break;
      default:
        return 'Aucune difficulté renseignée';
    }
  }
}
