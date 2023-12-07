import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverFilesComponent } from './recover-files.component';

describe('RecoverFilesComponent', () => {
  let component: RecoverFilesComponent;
  let fixture: ComponentFixture<RecoverFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverFilesComponent]
    });
    fixture = TestBed.createComponent(RecoverFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
