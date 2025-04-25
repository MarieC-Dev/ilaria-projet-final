import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowRecipesFilter]'
})
export class ShowRecipesFilterDirective implements OnInit {
  @Input() ulFiltersId: string = '';
  @Input() buttonType: 'burger' | 'plus' = 'plus';

  private burgerBtnState: boolean = false;
  private plusBtnState: boolean = false;

  // CONSTRUCTOR
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  // NG ON INIT
  ngOnInit(): void {    
    this.onClickBurgerBtn();

    if(this.ulFiltersId) {
      this.onClickPlusBtn(this.ulFiltersId);
    }
  }

  // ON CLICK
  @HostListener('click') onClick() {
    if(this.buttonType === 'burger') { // Burger button type
      this.burgerBtnState = !this.burgerBtnState;
      this.onClickBurgerBtn();
    } else if(this.buttonType === 'plus') { // Plus button type
      this.plusBtnState = !this.plusBtnState;
      this.onClickPlusBtn(this.ulFiltersId);
    } else { // no type
      throw new Error('The button has no directive');
    }
  }

  // ON CLICK BURGER BUTTON method
  onClickBurgerBtn() {
    const burgerBtn: HTMLElement = this.document.querySelector('.filterHeader button')!;
    const burgerDisplayState = getComputedStyle(burgerBtn).display;

    const burgerArrow: HTMLElement = this.document.querySelector('.filterHeader button svg')!;
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;

    if(burgerDisplayState !== 'none') { // burger btn display flex, block, etc... -> MOBILE
      this.renderer.setStyle(filtersListDiv, 'transition', `max-height ${0.1 * filtersListDiv.childNodes.length}s ease-in-out`);

      if(this.burgerBtnState) {
        this.renderer.setStyle(filtersListDiv, 'max-height', `${filtersListDiv.scrollHeight}px`);
        this.renderer.setStyle(burgerArrow, 'transform', `rotate(-180deg)`);
      } else {
        this.renderer.setStyle(filtersListDiv, 'max-height', '0');   
        this.renderer.setStyle(burgerArrow, 'transform', `rotate(0deg)`);
      }
    } else { // burger btn display none -> DESKTOP
      this.renderer.setStyle(filtersListDiv, 'max-height', 'auto');
    }
  }

  // ON CLICK PLUS BUTTONS method (with ids)
  onClickPlusBtn(id: string) {
    const filtersListDiv: HTMLElement = this.document.querySelector('div.filtersList')!;
    const getItemList: HTMLElement = this.document.querySelector(`#${id} .navFiltersListItem`)!;
    const plusIcon: HTMLElement = this.document.querySelector(`#${id} .verticalLine`)!;

    const setMaxHeightAnimation = (elm: HTMLElement, height: number, duration: number) => {
      this.renderer.setStyle(elm, 'max-height', `${height}px`);   
      this.renderer.setStyle(elm, 'transition', `max-height ${duration}s ease-in-out`);
    }

    if(this.plusBtnState) {
      setMaxHeightAnimation(
        filtersListDiv, 
        filtersListDiv.scrollHeight + getItemList.scrollHeight + 16, 
        0.4 * getItemList.childNodes.length
      );
      setMaxHeightAnimation(
        getItemList, 
        getItemList.scrollHeight, 
        0.4 * getItemList.childNodes.length);
      this.renderer.setStyle(plusIcon, 'transform', 'translateY(-2px) rotate(0)');
    } else {
      setMaxHeightAnimation(getItemList, 0, 0.4 * getItemList.childNodes.length);
      this.renderer.setStyle(plusIcon, 'transform', 'translateY(-2px) rotate(-90deg)');
    }
  }
}
