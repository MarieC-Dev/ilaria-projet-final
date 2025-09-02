import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SlugifyForRoutageService {

  constructor(private route: ActivatedRoute) { }

  slugifyString(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // pour enlever les accents
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-') // remplace les caractères non-alphanum
      .replace(/^-+|-+$/g, '');     // supprime les - en début/fin
  }
}
