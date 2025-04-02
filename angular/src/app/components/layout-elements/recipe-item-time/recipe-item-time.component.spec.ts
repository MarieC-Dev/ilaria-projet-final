import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemTimeComponent } from './recipe-item-time.component';

describe('RecipeItemTimeComponent', () => {
  let component: RecipeItemTimeComponent;
  let fixture: ComponentFixture<RecipeItemTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeItemTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeItemTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
