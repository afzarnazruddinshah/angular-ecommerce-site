import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProddescComponent } from './proddesc.component';

describe('ProddescComponent', () => {
  let component: ProddescComponent;
  let fixture: ComponentFixture<ProddescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProddescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProddescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
