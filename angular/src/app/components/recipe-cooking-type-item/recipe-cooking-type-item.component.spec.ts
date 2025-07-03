import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCookingTypeItemComponent } from './recipe-cooking-type-item.component';

describe('RecipeCookingTypeItemComponent', () => {
  let component: RecipeCookingTypeItemComponent;
  let fixture: ComponentFixture<RecipeCookingTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCookingTypeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCookingTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
