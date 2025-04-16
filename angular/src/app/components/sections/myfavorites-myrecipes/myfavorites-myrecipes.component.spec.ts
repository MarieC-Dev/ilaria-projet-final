import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavoritesMyrecipesComponent } from './myfavorites-myrecipes.component';

describe('MyfavoritesMyrecipesComponent', () => {
  let component: MyfavoritesMyrecipesComponent;
  let fixture: ComponentFixture<MyfavoritesMyrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyfavoritesMyrecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfavoritesMyrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
