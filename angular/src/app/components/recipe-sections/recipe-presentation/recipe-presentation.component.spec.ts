import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePresentationComponent } from './recipe-presentation.component';

describe('RecipePresentationComponent', () => {
  let component: RecipePresentationComponent;
  let fixture: ComponentFixture<RecipePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
