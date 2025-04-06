import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, Inject, HostListener } from '@angular/core';

interface ShowCommentAnswersConfig {
  targetId: string;
  checkBool: boolean;
}

@Directive({
  selector: '[appShowCommentAnswers]'
})
export class ShowCommentAnswersDirective {
  /* @Input('appShowCommentAnswers') targetId!: string;
  @Input('appShowCommentAnswers') checkBool!: boolean; */
  @Input('appShowCommentAnswers') 
  set config(value: ShowCommentAnswersConfig) {
    if (value) {
      this.targetId = value.targetId;
      this.checkBool = value.checkBool;
    }
  }

  private targetId!: string;
  private checkBool!: boolean;

  constructor(
    private elm: ElementRef, 
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('click') onClick() {
    this.setHeight(this.targetId, this.checkBool);
  }

  setHeight(id: string, bool: boolean) {
    const target = this.document.getElementById(id);
    
    if(target) {
      const scrollHeight = target.scrollHeight;
      const lenghtTarget = target.childNodes.length
      
      if(!bool) {
        this.renderer.setStyle(target, 'max-height', scrollHeight + 'px');
        this.renderer.setStyle(target, 'transition', `max-height ${0.15 * lenghtTarget}s ease-in-out`);
      } else {
        this.renderer.setStyle(target, 'max-height', '0');
        this.renderer.setStyle(target, 'transition', `max-height ${0.15 * lenghtTarget}s ease-in-out`);
      }
    }
  }
}
