import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCommentPageComponent } from './recipe-comment-page.component';

describe('RecipeCommentPageComponent', () => {
  let component: RecipeCommentPageComponent;
  let fixture: ComponentFixture<RecipeCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCommentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
