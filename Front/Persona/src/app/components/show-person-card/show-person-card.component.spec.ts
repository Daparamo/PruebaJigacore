import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonCardComponent } from './show-person-card.component';

describe('ShowPersonCardComponent', () => {
  let component: ShowPersonCardComponent;
  let fixture: ComponentFixture<ShowPersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPersonCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
