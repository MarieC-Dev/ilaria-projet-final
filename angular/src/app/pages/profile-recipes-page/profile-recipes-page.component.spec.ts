import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecipesPageComponent } from './profile-recipes-page.component';

describe('ProfileRecipesPageComponent', () => {
  let component: ProfileRecipesPageComponent;
  let fixture: ComponentFixture<ProfileRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecipesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
