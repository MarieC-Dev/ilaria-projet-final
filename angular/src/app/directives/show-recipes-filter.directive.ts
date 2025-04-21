import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, inject, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowRecipesFilter]'
})
export class ShowRecipesFilterDirective implements OnInit {
  @Input('appShowRecipesFilter') id: string = '';

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const getItemList: HTMLElement = this.document.querySelector(`#${this.id} .navFiltersListItem`)!;    
    this.renderer.setStyle(getItemList, 'max-height', '0');
  }

  @HostListener('click') onClick() {
    const getItemList: HTMLElement = this.document.querySelector(`#${this.id} .navFiltersListItem`)!;    
    const plusIcon: HTMLElement = this.document.querySelector(`#${this.id} .verticalLine`)!;
    console.log(plusIcon);
    
        
    if(getItemList.offsetHeight === 0) {
      this.renderer.setStyle(getItemList, 'max-height', `${getItemList.scrollHeight}px`);   
      this.renderer.setStyle(plusIcon, 'transform', `rotate(0deg)`);   
      this.renderer.setStyle(getItemList, 'transition', `max-height ${0.4 * getItemList.childNodes.length}s ease-in-out`);
    } else {
      this.renderer.setStyle(getItemList, 'max-height', '0');     
      this.renderer.setStyle(getItemList, 'transition', `max-height ${0.4 * getItemList.childNodes.length}s ease-in-out`);
      this.renderer.setStyle(plusIcon, 'transform', `rotate(-90deg)`); 
    }    
  }
}
