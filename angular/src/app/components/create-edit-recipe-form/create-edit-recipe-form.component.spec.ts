import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRecipeFormComponent } from './create-edit-recipe-form.component';

describe('CreateEditRecipeFormComponent', () => {
  let component: CreateEditRecipeFormComponent;
  let fixture: ComponentFixture<CreateEditRecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditRecipeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
