import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInputsComponent } from './multiple-inputs.component';

describe('MultipleInputsComponent', () => {
  let component: MultipleInputsComponent;
  let fixture: ComponentFixture<MultipleInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
