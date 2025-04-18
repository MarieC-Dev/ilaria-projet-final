import { Component, input } from '@angular/core';
import { SearchIconComponent } from "../icons/search-icon/search-icon.component";
import { SortBySelectComponent } from "../sort-by-select/sort-by-select.component";

@Component({
  selector: 'app-search-form',
  imports: [SearchIconComponent, SortBySelectComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  addClass = input<string>('');
  selectId = input.required<string>();
}
