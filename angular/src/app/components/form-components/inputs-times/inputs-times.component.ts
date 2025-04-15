import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MultipleInputsComponent } from '../multiple-inputs/multiple-inputs.component';
import { INPUTS_TIMES } from '../../../lists/inputs-times.list';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TotalTimeService } from '../../../services/total-time.service';

@Component({
  selector: 'app-inputs-times',
  imports: [MultipleInputsComponent, CommonModule, FormsModule, JsonPipe],
  templateUrl: './inputs-times.component.html',
  styleUrl: './inputs-times.component.scss'
})
export class InputsTimesComponent implements OnInit {
  times = signal(INPUTS_TIMES);
  totalTime = inject(TotalTimeService);
  hoursValues = model<Array<number>>([0, 0, 0]);
  minutesValues = model<Array<number>>([0, 0, 0]);

  ngOnInit(): void {}

  getTotalTime() {
    let parseHours = this.hoursValues().map(Number);
    let parseMinutes = this.minutesValues().map(Number);

    return this.totalTime.getTotalTimeService(parseHours, parseMinutes);
  }
}
