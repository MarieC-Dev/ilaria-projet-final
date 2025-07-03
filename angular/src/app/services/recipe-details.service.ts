import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {

  constructor() { }

  getCuisineLabel(type: string) {
    switch (type) {
      case 'french':
        return 'Française';
      case 'overseas':
        return 'Des DOM-TOM';
      case 'italian':
        return 'Italienne';
      case 'spanish':
        return 'Espagnole';
      case 'portuguese':
        return 'Portugaise';
      case 'european':
        return 'Européenne';
      case 'great-britain':
        return 'Britannique';
      case 'irish':
        return 'Irlandaise';
      case 'nordic-countries':
        return 'Nordique';
      case 'russian':
        return 'Russe';
      case 'north-asia':
        return 'Asie du Nord';
      case 'south-asia':
        return 'Asie du Sud';
      case 'india':
        return 'Indienne';
      case 'north-african':
        return 'Afrique du Nord';
      case 'african':
        return 'Africaine';
      case 'north-america':
        return 'Amérique du Nord';
      case 'central-america':
        return 'Amérique centrale';
      case 'south-america':
        return 'Amérique du Sud';
      case 'australia':
        return 'Australienne';
      default:
        return 'Aucun type de cuisine';
    }
  }

  getUnitLabel(unit: string) {
    switch (unit) {
      case 'person':
        return 'personne(s)';
      case 'piece':
        return 'pièce(s)';
      case 'liter':
        return 'litre(s)';
      case 'cylinders':
        return 'vérine(s)';
      default:
        return 'Inconnue';
    }
  }

  getDifficultyLabel(level: string) {
    switch (level) {
      case 'easy':
        return 'Facile';
      case 'intermediate':
        return 'Intermédiaire';
      case 'difficult':
        return 'Difficile';
      default:
        return 'Inconnu';
    }
  }
}
