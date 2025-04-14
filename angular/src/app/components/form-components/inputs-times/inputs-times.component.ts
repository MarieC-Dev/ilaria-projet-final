import { Component, signal } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { INPUTS_TIMES } from '../../../lists/inputs-times.list';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs-times',
  imports: [MultipleInputsComponent, CommonModule, FormsModule, JsonPipe],
  templateUrl: './inputs-times.component.html',
  styleUrl: './inputs-times.component.scss'
})
export class InputsTimesComponent {
  index: number = 0;
  times = signal(INPUTS_TIMES);

  setYesCondition(time: any) {
    console.log(time.id);

    time.condition.yes.checked = false;
    time.condition.no.checked = true;
  }

  setNoCondition(time: any) {
    console.log(time.id);

    time.condition.no.checked = false;
    time.condition.yes.checked = true;
  }

}
