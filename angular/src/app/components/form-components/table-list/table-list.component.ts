import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {DeleteIconComponent} from "../../icons/delete-icon/delete-icon.component";
import {FormArray} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-table-list',
    imports: [
      DeleteIconComponent,
      JsonPipe
    ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent {
  @Input() typeTable!: string;
  @Input() headList: Array<string> = [];
  @Input() bodyList!: any;
  @Output() removeFunc = new EventEmitter<Event>();

  onClick(event: Event) {
    this.removeFunc.emit(event);
  }

  getIngredientUnit(item: any): string {
    switch (item.value.unit) {
      case 'tablespoon': return 'Cuillère à soupe';
        break;
      case 'gram': return 'Grammes (g)';
        break;
      case 'milligram': return 'Milligrammes (mg)';
        break;
      case 'liter': return 'Litres (L)';
        break;
      case 'milliliter': return 'Millilitres (ml)';
        break;
      case 'pot': return 'Pot(s) de yaourt';
        break;
      default: return '';
    }
  }

}
