import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingTypeComponent } from './cooking-type.component';

describe('CookingTypeComponent', () => {
  let component: CookingTypeComponent;
  let fixture: ComponentFixture<CookingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
