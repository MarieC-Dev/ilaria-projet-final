import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipesPageComponent } from './admin-recipes-page.component';

describe('AdminRecipesPageComponent', () => {
  let component: AdminRecipesPageComponent;
  let fixture: ComponentFixture<AdminRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecipesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
