import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousmarqueComponent } from './sousmarque.component';

describe('SousmarqueComponent', () => {
  let component: SousmarqueComponent;
  let fixture: ComponentFixture<SousmarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousmarqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SousmarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
