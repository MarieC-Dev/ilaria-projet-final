import { Component } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';

@Component({
  selector: 'app-inputs-times',
  imports: [MultipleInputsComponent],
  templateUrl: './inputs-times.component.html',
  styleUrl: './inputs-times.component.scss'
})
export class InputsTimesComponent {
  index: number = 0;
  readonly times = [
    {
      id: this.index++,
      title: "Temps de préparation :",
      hours: {
        type: 'number',
        inputId: 'makingTimeHours',
        placeholder: 'Heures',
        required: false
      },
      minutes: {
        type: 'number',
        inputId: 'makingTimeMinutes',
        placeholder: 'Minutes',
        required: true
      },
    }, {
      id: this.index++,
      title: "Temps de cuisson :",
      hours: {
        type: 'number',
        inputId: 'cookingTimeHours',
        placeholder: 'Heures',
        required: false
      },
      minutes: {
        type: 'number',
        inputId: 'cookingTimeMinutes',
        placeholder: 'Minutes',
        required: true
      },
    }, {
      id: this.index++,
      title: "Temps de pause :",
      hours: {
        type: 'number',
        inputId: 'pauseTimeHours',
        placeholder: 'Heures',
        required: false
      },
      minutes: {
        type: 'number',
        inputId: 'pauseTimeMinutes',
        placeholder: 'Minutes',
        required: true
      },
    }, 
  ]
}
