import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecord } from './edit-record';

describe('EditRecord', () => {
  let component: EditRecord;
  let fixture: ComponentFixture<EditRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
