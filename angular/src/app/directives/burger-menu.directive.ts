import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBurgerMenu]'
})
export class BurgerMenuDirective {
  @Input() burger: 'burger' = 'burger';
  private burgerState: boolean = false;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  @HostListener('click') onClick() {
    const header: HTMLElement = this.document.querySelector('header')!;
    const menu: HTMLElement = this.document.querySelector('header .navigationLeft')!;
    const burgerBtn: HTMLElement = this.document.querySelector('.burgerMenu')!;
    const firstLine: HTMLElement = this.document.querySelector('.burgerMenu span:first-child')!;
    const secondLine: HTMLElement = this.document.querySelector('.burgerMenu span:last-child')!;

    if(this.burger === 'burger') {
      this.burgerState = !this.burgerState;
    
      if(this.burgerState) {
        this.renderer.setStyle(header, 'bottom', '0');
        this.renderer.setStyle(menu, 'max-height', menu.scrollHeight + 144 + 'px');
        this.renderer.setStyle(menu, 'padding', '3rem 1rem 6rem 1rem');

        this.renderer.setStyle(firstLine, 'transform', 'rotate(45deg) translateY(13px)');
        this.renderer.setStyle(secondLine, 'transform', 'rotate(-45deg) translateY(-12px)');
      } else {
        this.renderer.setStyle(header, 'bottom', 'initial');
        this.renderer.setStyle(menu, 'max-height', '0');
        this.renderer.setStyle(menu, 'padding', '0');
        this.renderer.setStyle(firstLine, 'transform', 'rotate(0)');
        this.renderer.setStyle(secondLine, 'transform', 'rotate(0)');
      }

      console.log(this.burgerState);
    }
    
    
  }
}
