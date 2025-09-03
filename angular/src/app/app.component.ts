import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: '../styles/style.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      if (data['title']) {
        this.titleService.setTitle(data['title']);
      }
    });

    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      const formattedSlug = slug.split('-')
        .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      this.titleService.setTitle(`${formattedSlug}`);
    }
  }
}
