import { DOCUMENT } from '@angular/common';
import { computed, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, Renderer2, signal } from '@angular/core';

@Directive({
  selector: '[appBurgerMenu]'
})
export class BurgerMenuDirective {
  //@Input('appBurgerMenu') btnType: 'burgerBtn' | 'burgerNav' = 'burgerBtn';
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: Document,
    private elm: ElementRef
  ) {
    console.log(this.isOpen);
  }

  @HostListener('click', ['$event']) onClickBurger(event: MouseEvent) {
    event.stopPropagation();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;

    console.log(this.isOpen);

    if(this.isOpen) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    const header: HTMLElement = this.document.querySelector('header')!;
    const menu: HTMLElement = this.document.querySelector('header .navigationLeft')!;
    const firstLine: HTMLElement = this.document.querySelector('.burgerMenu span:first-child')!;
    const secondLine: HTMLElement = this.document.querySelector('.burgerMenu span:last-child')!;

    this.renderer.setStyle(header, 'bottom', '0');
    this.renderer.setStyle(menu, 'max-height', menu.scrollHeight + 144 + 'px');
    this.renderer.setStyle(menu, 'padding', '3rem 1rem 6rem 1rem');

    this.renderer.setStyle(firstLine, 'transform', 'rotate(45deg) translateY(13px)');
    this.renderer.setStyle(secondLine, 'transform', 'rotate(-45deg) translateY(-12px)');
  }

  closeMenu() {
    const header: HTMLElement = this.document.querySelector('header')!;
    const menu: HTMLElement = this.document.querySelector('header .navigationLeft')!;
    const firstLine: HTMLElement = this.document.querySelector('.burgerMenu span:first-child')!;
    const secondLine: HTMLElement = this.document.querySelector('.burgerMenu span:last-child')!;

    setTimeout(() => {
      this.renderer.setStyle(header, 'bottom', 'initial');
    }, 600);
    
    this.renderer.setStyle(menu, 'max-height', '0');
    this.renderer.setStyle(menu, 'padding', '0');
    this.renderer.setStyle(firstLine, 'transform', 'rotate(0)');
    this.renderer.setStyle(secondLine, 'transform', 'rotate(0)');

    this.isOpen = false;
  }

  /* toggleMenu() {
    const header: HTMLElement = this.document.querySelector('header')!;
    const menu: HTMLElement = this.document.querySelector('header .navigationLeft')!;
    const firstLine: HTMLElement = this.document.querySelector('.burgerMenu span:first-child')!;
    const secondLine: HTMLElement = this.document.querySelector('.burgerMenu span:last-child')!;

    console.log(this.burgerState());

    this.burgerState.update((bool) => bool = !bool)

    if(this.burgerState()) {
      this.openMenu(header, menu, firstLine, secondLine);
    } else {
      this.closeMenu(header, menu, firstLine, secondLine);
    }
  }

  openMenu(header: HTMLElement, menu: HTMLElement, firstLine: HTMLElement, secondLine: HTMLElement) {
    this.renderer.setStyle(header, 'bottom', '0');
    this.renderer.setStyle(menu, 'max-height', menu.scrollHeight + 144 + 'px');
    this.renderer.setStyle(menu, 'padding', '3rem 1rem 6rem 1rem');

    this.renderer.setStyle(firstLine, 'transform', 'rotate(45deg) translateY(13px)');
    this.renderer.setStyle(secondLine, 'transform', 'rotate(-45deg) translateY(-12px)');
  }

  closeMenu(header: HTMLElement, menu: HTMLElement, firstLine: HTMLElement, secondLine: HTMLElement) {
    setTimeout(() => {
      this.renderer.setStyle(header, 'bottom', 'initial');
    }, 600);
    
    this.renderer.setStyle(menu, 'max-height', '0');
    this.renderer.setStyle(menu, 'padding', '0');
    this.renderer.setStyle(firstLine, 'transform', 'rotate(0)');
    this.renderer.setStyle(secondLine, 'transform', 'rotate(0)');
  } */
}
