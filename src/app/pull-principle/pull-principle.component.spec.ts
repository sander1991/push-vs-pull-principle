import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullPrincipleComponent } from './pull-principle.component';

describe('PullPrincipleComponent', () => {
  let component: PullPrincipleComponent;
  let fixture: ComponentFixture<PullPrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PullPrincipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PullPrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
