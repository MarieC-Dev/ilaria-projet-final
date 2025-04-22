import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, inject, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowRecipesFilter]'
})
export class ShowRecipesFilterDirective implements OnInit {
  @Input('appShowRecipesFilter') id: string = '';
  @Input() btnType: 'burger' | 'plus' = 'plus';

  private burgerBtn: boolean = false;
  private plusBtn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if(this.btnType === 'burger') { // Burger
      this.handleBurgerBtn();
    } else { // Plus
      this.handlePlusBtn();
    }
  }

  // ONCLICK METHOD
  @HostListener('click') onClick() {
    if(this.btnType === 'burger') { // Burger button
      this.burgerBtn = true;
      return this.handleBurgerBtn();
    } else {
      this.burgerBtn = false;
    }

    if(this.btnType === 'plus') { // Plus button
      this.plusBtn = true;
      return this.handlePlusBtn();
    } else {
      this.plusBtn = false;
    }
  }

  // HANDLE BURGER BUTTON
  handleBurgerBtn() {
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;
    const burgerBtnFirstLine: HTMLElement = this.document.querySelector('.filterHeader button span.burgerFirstLine')!;
    const burgerBtnSecondLine: HTMLElement = this.document.querySelector('.filterHeader button span.burgerSecondLine')!;
    const translate: number = 6;
    const degree: number = 45;

    const initBurger = () => {
      this.setMaxHeightAnimation(filtersListDiv, 0, 0.1 * filtersListDiv.childNodes.length);
      this.setTransformAnimation(burgerBtnFirstLine, `translateY(0) rotate(0)`);
      this.setTransformAnimation(burgerBtnSecondLine, `translateY(0) rotate(0)`);
    }
    
    if(this.burgerBtn) {
      if(filtersListDiv.offsetHeight === 0) {        
        this.setMaxHeightAnimation(filtersListDiv, filtersListDiv.scrollHeight, 0.1 * filtersListDiv.childNodes.length);
        this.setTransformAnimation(burgerBtnFirstLine, `translateY(${translate}px) rotate(-${degree}deg)`);
        this.setTransformAnimation(burgerBtnSecondLine, `translateY(-${translate}px) rotate(${degree}deg)`);
      } else {
        initBurger();
      }
    } else {
      initBurger();
    }
  }

  // HANDLE PLUS BUTTONS (with ids)
  handlePlusBtn() {
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;
    const getItemList: HTMLElement = this.document.querySelector(`#${this.id} .navFiltersListItem`)!;
    const plusIcon: HTMLElement = this.document.querySelector(`#${this.id} .verticalLine`)!;
    // TODO Gérer la version desktop

    console.log('Hauteur de la liste avec items', getItemList.scrollHeight);
    console.log('Hauteur total', filtersListDiv.scrollHeight + getItemList.scrollHeight);

    /*
      1er : 515,5
      2eme : 196
      3eme : 231,5

      Header : 36,5 + 16 = 52,5

      1er : 515,5 + 52,5 = 568
    */
    

    const initPlus = () => {
      this.setMaxHeightAnimation(getItemList, 0, 0.4 * getItemList.childNodes.length);
      this.setTransformAnimation(plusIcon, 'translateY(-2px) rotate(-90deg)');
    }

    if(this.plusBtn) {
      if(getItemList.offsetHeight === 0) {
        // Agrandir la hauteur de la liste des filtres
        this.setMaxHeightAnimation(filtersListDiv, filtersListDiv.scrollHeight + getItemList.scrollHeight + 16, 0.4 * getItemList.childNodes.length);
        this.setMaxHeightAnimation(getItemList, getItemList.scrollHeight, 0.4 * getItemList.childNodes.length);
        this.setTransformAnimation(plusIcon, 'translateY(-2px) rotate(0)');
      } else {
        initPlus();
      }
    } else {
      initPlus();
    }
  }

  /* Set styles methodes */
  setMaxHeightAnimation(elm: HTMLElement, height: number, duration: number) {
    this.renderer.setStyle(elm, 'max-height', `${height}px`);   
    this.renderer.setStyle(elm, 'transition', `max-height ${duration}s ease-in-out`);
  }

  setTransformAnimation(elm: HTMLElement, property: string) {
    this.renderer.setStyle(elm, 'transform', property);   
  }
}
