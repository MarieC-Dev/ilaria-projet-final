import { DOCUMENT } from '@angular/common';

import { Directive, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVideosSlider]'
})
export class VideosSliderDirective implements OnInit {
  @Input() buttonType: 'next' | 'previous' = 'next';

  private seletor: string = '.wrapperVideos ul.videosList';

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {

  }

  @HostListener('click') onClick() {
    const wrapperVideos: HTMLElement = this.document.querySelector('.wrapperVideos')!;
    const videosList: HTMLElement = this.document.querySelector(this.seletor)!;
    const videoItemAll: any = this.document.querySelectorAll(this.seletor + ' li.videoItem')!;
    //console.log(videosList.children);

    let i: number = 0;

    const listRect = videosList.getBoundingClientRect();
    //console.log(listRect);
    const array: Array<boolean> = [];

    for (let i = 0; i < videoItemAll.length; i++) {
      // si les 4 dernier éléments de la liste est true -> btn R disabled
      // si les 4 premier éléments de la liste est true -> btn L disabled
      
      const videoRect = videoItemAll[i].getBoundingClientRect();

      if(videoRect.left >= listRect.left && videoRect.right <= listRect.right) {
        array.push(true);
      } else {
        array.push(false);
      }
    }

    //console.log(array);
    
    if(this.buttonType === 'previous') {
      console.log('previous');
    } else {
      
      console.log(i+=1);

      this.renderer.setStyle(videosList, 'transform', `translate(-${videoItemAll[0].offsetWidth}px)`)
    }
  }

}
