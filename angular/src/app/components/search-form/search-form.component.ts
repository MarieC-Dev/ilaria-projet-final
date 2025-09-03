import {Component, EventEmitter, input, model, Output} from '@angular/core';
import { SearchIconComponent } from "../icons/search-icon/search-icon.component";
import { SortBySelectComponent } from "../sort-by-select/sort-by-select.component";
import {RecipesApiService} from '../../services/recipes-api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  imports: [SearchIconComponent, SortBySelectComponent, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  addClass = input<string>('');
  selectId = input.required<string>();
  searchTerm = '';

  @Output() search = new EventEmitter<string>();

  onSearch(): void {
    const trimmed = this.searchTerm.trim();
    if (trimmed) {
      this.search.emit(trimmed);
    }
  }
}
