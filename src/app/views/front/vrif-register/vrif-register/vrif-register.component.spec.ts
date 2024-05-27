import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrifRegisterComponent } from './vrif-register.component';

describe('VrifRegisterComponent', () => {
  let component: VrifRegisterComponent;
  let fixture: ComponentFixture<VrifRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrifRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrifRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
