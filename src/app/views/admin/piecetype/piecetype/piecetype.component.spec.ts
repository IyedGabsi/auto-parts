import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecetypeComponent } from './piecetype.component';

describe('PiecetypeComponent', () => {
  let component: PiecetypeComponent;
  let fixture: ComponentFixture<PiecetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiecetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
