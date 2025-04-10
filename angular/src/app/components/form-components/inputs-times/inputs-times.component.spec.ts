import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsTimesComponent } from './inputs-times.component';

describe('InputsTimesComponent', () => {
  let component: InputsTimesComponent;
  let fixture: ComponentFixture<InputsTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsTimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputsTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
