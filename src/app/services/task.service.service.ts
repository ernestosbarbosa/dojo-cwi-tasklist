import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  addTask(itemsCollection: AngularFirestoreCollection<Task>, task: Task) {
    itemsCollection.add(task).then(res => {
      task.id = res.id
      itemsCollection.doc(res.id).set(task);
    });
  }

  updateTask(itemsCollection: AngularFirestoreCollection<Task>, task: Task) {
    itemsCollection.doc(task.id).set(task);
  }

  deleteTask(itemsCollection: AngularFirestoreCollection<Task>, task: Task) {
    itemsCollection.doc(task.id).delete()
  }
}
