import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDialog } from './add-task-dialog.component';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/interfaces/task';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MatDialogRefStub = {
  close: () => new BehaviorSubject({ foo: 'bar' })
};

const MatDialogDataStub: Task = {name: "Teste", done: false, time: { hours: 8, minutes: 10 }};

describe('AddTaskDialog', () => {
  let component: AddTaskDialog;
  let fixture: ComponentFixture<AddTaskDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskDialog],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: MatDialogDataStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
