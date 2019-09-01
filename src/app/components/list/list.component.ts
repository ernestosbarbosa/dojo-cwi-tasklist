import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { MatDialog } from '@angular/material';
import { AddTaskDialog } from '../add-task-dialog/add-task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Task>
  tasks: Observable<Task[]>

  constructor(
    private afs: AngularFirestore,
    public ts: TaskService,
    public dialog: MatDialog
  ) {
    this.itemsCollection = this.afs.collection<Task>(environment.firebase.collectionName);
    this.tasks = this.itemsCollection.valueChanges();
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr((size * -1), size);
  }

  add() {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '50%',
      data: {
        name: '',
        time: {
          hours: null,
          minutes: null
        }
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      let task: Task = { name: result.name }
      if (result.time != undefined && result.time.hours != null && result.time.minutes != null) {
        task.time = {
          hours: result.time.hours,
          minutes: result.time.minutes
        }
      }
      this.ts.addTask(this.itemsCollection, task)
    })
  }

  changeSelection(task: Task) {
    task.done = !task.done
    this.ts.updateTask(this.itemsCollection, task)
  }

  delete(task) {
    this.ts.deleteTask(this.itemsCollection, task)
  }

  ngOnInit() {
  }

}
