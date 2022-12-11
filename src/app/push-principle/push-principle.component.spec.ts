import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushPrincipleComponent } from './push-principle.component';

describe('PushPrincipleComponent', () => {
  let component: PushPrincipleComponent;
  let fixture: ComponentFixture<PushPrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PushPrincipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushPrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
