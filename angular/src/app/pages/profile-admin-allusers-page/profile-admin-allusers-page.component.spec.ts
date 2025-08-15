import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminAllusersPageComponent } from './profile-admin-allusers-page.component';

describe('ProfileAdminAllusersPageComponent', () => {
  let component: ProfileAdminAllusersPageComponent;
  let fixture: ComponentFixture<ProfileAdminAllusersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAdminAllusersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAdminAllusersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
