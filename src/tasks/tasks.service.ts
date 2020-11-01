import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid'
import { CreateTaskDTO } from './DTO/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task{
    return this.tasks.find(task => task.id === id)
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {

    const { title, description } = createTaskDTO

    const task: Task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task;
  }

  deleteTask(id: string): void {
    /*
    My way 
    const task = this.getTaskById(id)
    const taskIndex = this.tasks.indexOf(task)
    this.tasks.splice(taskIndex, 1) 
    */
   //Teacher way
    this.tasks = this.tasks.filter(task => task.id !== id)
  }

}
