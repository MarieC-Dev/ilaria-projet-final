import { Component, input } from '@angular/core';

@Component({
  selector: 'app-social-networks',
  imports: [],
  templateUrl: './social-networks.component.html',
  styleUrl: './social-networks.component.scss'
})
export class SocialNetworksComponent {
  link = input<string>('');
  pathImg = input<string>('');
  altImg = input<string>('');
}
