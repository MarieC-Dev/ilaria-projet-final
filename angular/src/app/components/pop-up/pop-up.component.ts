import {Component, input} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  labelName = input<string>();
  deleteFunction = input<any>();
  isShow = input<boolean>(false);
}
