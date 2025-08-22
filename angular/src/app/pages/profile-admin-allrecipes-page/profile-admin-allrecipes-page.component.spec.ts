import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminAllrecipesPageComponent } from './profile-admin-allrecipes-page.component';

describe('ProfileAdminAllrecipesPageComponent', () => {
  let component: ProfileAdminAllrecipesPageComponent;
  let fixture: ComponentFixture<ProfileAdminAllrecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAdminAllrecipesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAdminAllrecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
