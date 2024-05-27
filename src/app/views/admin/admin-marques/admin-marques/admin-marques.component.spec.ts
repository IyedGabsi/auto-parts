import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarquesComponent } from './admin-marques.component';

describe('AdminMarquesComponent', () => {
  let component: AdminMarquesComponent;
  let fixture: ComponentFixture<AdminMarquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMarquesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
