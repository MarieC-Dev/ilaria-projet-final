import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsIngredientsInputsComponent } from './steps-ingredients-inputs.component';

describe('StepsIngredientsInputsComponent', () => {
  let component: StepsIngredientsInputsComponent;
  let fixture: ComponentFixture<StepsIngredientsInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsIngredientsInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsIngredientsInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
