import { Injectable } from '@angular/core';
import { TaskData } from '../task-data';
import { Task } from '../task';

@Injectable()
export class TaskService {

  constructor() { }

  getTaskData(): Promise<Task[]> {
    return Promise.resolve(TaskData);
  }

  addTask(task: Task) {
    TaskData.push(task);
  }

}
