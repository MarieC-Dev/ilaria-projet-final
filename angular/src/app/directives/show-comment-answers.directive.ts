import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Renderer2, Input, Inject } from '@angular/core';

@Directive({
  selector: '[appShowCommentAnswers]'
})
export class ShowCommentAnswersDirective {
  @Input('appShowCommentAnswers') targetId!: string;

  constructor(
    private elm: ElementRef, 
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { 
    const target = this.document.getElementById(this.targetId);
    console.log('Constructor :', target);
    
    //this.renderer.setStyle(this.elm.nativeElement, 'max-height', '0');
  }

  getHeight(): any {
    //console.log('scrollHeight : ', this.elm.nativeElement.scrollHeight);

    const target = this.document.getElementById(this.targetId);
    console.log('target :', target);
  }

  setHeight(target: string) {
    const scrollHeight = this.elm.nativeElement.scrollHeight;
    //const target = this.document.getElementById(this.targetId);
    
    this.renderer.setStyle(target, 'max-height', scrollHeight + 'px');
    this.renderer.setStyle(target, 'border', '1px solid blue');
    
  }
}
