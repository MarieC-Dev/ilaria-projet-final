import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipesComponent } from './create-recipes.component';

describe('CreateRecipesComponent', () => {
  let component: CreateRecipesComponent;
  let fixture: ComponentFixture<CreateRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
