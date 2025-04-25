import { Component, input } from '@angular/core';
import { ArrowsUpDownComponent } from "../icons/arrows-up-down/arrows-up-down.component";

@Component({
  selector: 'app-sort-by-select',
  imports: [ArrowsUpDownComponent],
  templateUrl: './sort-by-select.component.html',
  styleUrl: './sort-by-select.component.scss'
})
export class SortBySelectComponent {
  selectId = input.required<string>();
}
