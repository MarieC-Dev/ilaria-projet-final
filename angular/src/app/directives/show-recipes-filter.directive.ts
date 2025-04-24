import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowRecipesFilter]'
})
export class ShowRecipesFilterDirective implements OnInit {
  @Input() navFiltersId: string = '';
  @Input() buttonType: 'burger' | 'plus' = 'plus';

  private burgerBtnState: boolean = false;
  private plusBtnState: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const burgerBtn: HTMLElement = this.document.querySelector('.filterHeader button')!;
    const burgerDisplay = getComputedStyle(burgerBtn).display;

    if(this.burgerBtnState) {
      this.onClickBurgerBtn();
    }

    if(this.navFiltersId) {
      this.onClickPlusBtn(this.navFiltersId);
    }
  }

  @HostListener('click') onClick() {
    if(this.buttonType === 'burger') {
      this.burgerBtnState = !this.burgerBtnState;
      this.onClickBurgerBtn();
    } else if(this.buttonType === 'plus') {
      this.plusBtnState = !this.plusBtnState;
      this.onClickPlusBtn(this.navFiltersId);
    } else {
      throw new Error('The button has no directive');
    }
  }

  // HANDLE BURGER BUTTON
  onClickBurgerBtn() {
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;
    const burgerBtnFirstLine: HTMLElement = this.document.querySelector('.filterHeader button span.burgerFirstLine')!;
    const burgerBtnSecondLine: HTMLElement = this.document.querySelector('.filterHeader button span.burgerSecondLine')!;
    const translate: number = 6;
    const degree: number = 45;

    const initBurger = () => {
      this.setMaxHeightAnimation(filtersListDiv, 0, 0.1 * filtersListDiv.childNodes.length);
      this.renderer.setStyle(burgerBtnFirstLine, 'transform', `translateY(0) rotate(0)`);
      this.renderer.setStyle(burgerBtnSecondLine, 'transform', `translateY(0) rotate(0)`);
    }

    const setInitBurger = () => {
      this.setMaxHeightAnimation(filtersListDiv, filtersListDiv.scrollHeight, 0.1 * filtersListDiv.childNodes.length);
      this.renderer.setStyle(burgerBtnFirstLine, 'transform', `translateY(${translate}px) rotate(-${degree}deg)`);
      this.renderer.setStyle(burgerBtnSecondLine, 'transform', `translateY(-${translate}px) rotate(${degree}deg)`);
    }
    
    if(filtersListDiv.offsetHeight === 0 && this.burgerBtnState) {
      setInitBurger();     
    } else {
      initBurger();
    }
  }

  // HANDLE PLUS BUTTONS (with ids)
  onClickPlusBtn(id: string) {
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;
    const getItemList: HTMLElement = this.document.querySelector(`#${id} .navFiltersListItem`)!;
    const plusIcon: HTMLElement = this.document.querySelector(`#${id} .verticalLine`)!;
    // TODO Gérer la version desktop

    const initPlus = () => {
      this.setMaxHeightAnimation(getItemList, 0, 0.4 * getItemList.childNodes.length);
      this.renderer.setStyle(plusIcon, 'transform', 'translateY(-2px) rotate(-90deg)');
    }

    const setInitPlus = () => {
      this.setMaxHeightAnimation(filtersListDiv, filtersListDiv.scrollHeight + getItemList.scrollHeight + 16, 0.4 * getItemList.childNodes.length);
      this.setMaxHeightAnimation(getItemList, getItemList.scrollHeight, 0.4 * getItemList.childNodes.length);
      this.renderer.setStyle(plusIcon, 'transform', 'translateY(-2px) rotate(0)');
    }

    if(getItemList.offsetHeight === 0 && this.plusBtnState) {
      setInitPlus();
    } else {
      initPlus();
    }
  }

  /* Set styles methodes */
  setMaxHeightAnimation(elm: HTMLElement, height: number, duration: number) {
    this.renderer.setStyle(elm, 'max-height', `${height}px`);   
    this.renderer.setStyle(elm, 'transition', `max-height ${duration}s ease-in-out`);
  }
}
