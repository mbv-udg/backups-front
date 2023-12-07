import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverDbComponent } from './recover-db.component';

describe('RecoverDbComponent', () => {
  let component: RecoverDbComponent;
  let fixture: ComponentFixture<RecoverDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverDbComponent]
    });
    fixture = TestBed.createComponent(RecoverDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
