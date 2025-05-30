import {Component, Input, input} from '@angular/core';
import {DeleteIconComponent} from "../../icons/delete-icon/delete-icon.component";
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-table-list',
    imports: [
      DeleteIconComponent
    ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent {
  @Input() typeTable!: string;
  @Input() headList: Array<string> = [];
  @Input() bodyList!: FormArray;
  @Input() removeFunc!: any;
}
