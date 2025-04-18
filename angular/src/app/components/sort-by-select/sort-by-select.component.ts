import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sort-by-select',
  imports: [],
  templateUrl: './sort-by-select.component.html',
  styleUrl: './sort-by-select.component.scss'
})
export class SortBySelectComponent {
  selectId = input.required<string>();
}
