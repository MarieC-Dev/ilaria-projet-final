import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFavoritesPageComponent } from './admin-favorites-page.component';

describe('AdminFavoritesPageComponent', () => {
  let component: AdminFavoritesPageComponent;
  let fixture: ComponentFixture<AdminFavoritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFavoritesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
