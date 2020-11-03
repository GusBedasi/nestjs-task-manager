import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid'
import { CreateTaskDTO } from './DTO/create-task-dto';
import { UpdateTaskDTO } from './DTO/update-task-dto';
import { GetTaskFilterDTO } from './DTO/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTask(filterDTO: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDTO;

    let tasks =  this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => {
        return (
          task.title.includes(search) ||
          task.description.includes(search)
        )
      });
    }

    return tasks
  }

  getTaskById(id: string): Task{
    const found = this.tasks.find(task => task.id === id)

    if (!found) {
      throw new NotFoundException(`No Task with ID ${id}`)
    }

    return found
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

  updateTask(updateTaskDTO: UpdateTaskDTO): Task {
    const task = this.getTaskById(updateTaskDTO.id)
    
    if(task){
      if(updateTaskDTO.title && updateTaskDTO.description){
        task.title = updateTaskDTO.title
        task.description = updateTaskDTO.description
      }
      task.status = updateTaskDTO.status
    }

    return task
  }

  deleteTask(id: string): Record<string, unknown> {
    const found =  this.getTaskById(id)

    this.tasks = this.tasks.filter(task => task.id !== found.id)

    return (
      {
        message: 'Task Deleted successfully',
        task: found
      }
    )
  }

}
