import { Component, input } from '@angular/core';
import { SearchIconComponent } from "../icons/search-icon/search-icon.component";

@Component({
  selector: 'app-search-form',
  imports: [SearchIconComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  addClass = input<string>('');
}
