import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRecipesComponent } from './other-recipes.component';

describe('OtherRecipesComponent', () => {
  let component: OtherRecipesComponent;
  let fixture: ComponentFixture<OtherRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
