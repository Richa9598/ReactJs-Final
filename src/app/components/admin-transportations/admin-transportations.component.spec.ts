import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportationsComponent } from './admin-transportations.component';

describe('AdminTransportationsComponent', () => {
  let component: AdminTransportationsComponent;
  let fixture: ComponentFixture<AdminTransportationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransportationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
