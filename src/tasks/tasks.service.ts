import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/create-task-dto';
import { UpdateTaskDTO } from './DTO/update-task-dto';
import { GetTaskFilterDTO } from './DTO/get-task-filter-dto';
import { TaskRespository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRespository)
    private taskRespository: TaskRespository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getFilterTask(filterDTO: GetTaskFilterDTO): Task[] {
  //   const { status, search } = filterDTO;

  //   let tasks =  this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task => {
  //       return (
  //         task.title.includes(search) ||
  //         task.description.includes(search)
  //       )
  //     });
  //   }

  //   return tasks
  // }

    async getTaskById(id: number): Promise<Task> {
      const found = await this.taskRespository.findOne(id)

      if (!found) {
        throw new NotFoundException(`No Task with ID ${id}`)
      }

      return found
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
      return this.taskRespository.createTask(createTaskDTO)
    }

    async updateTask(updateTaskDTO: UpdateTaskDTO): Promise<Task> {
      const task = await this.getTaskById(updateTaskDTO.id)

      if(task){
        if(updateTaskDTO.title && updateTaskDTO.description){
          task.title = updateTaskDTO.title
          task.description = updateTaskDTO.description
        }
        task.status = updateTaskDTO.status
      }
      
      return task
    }

  // updateTask(updateTaskDTO: UpdateTaskDTO): Task {
  //   const task = this.getTaskById(updateTaskDTO.id)
    
  //   if(task){
  //     if(updateTaskDTO.title && updateTaskDTO.description){
  //       task.title = updateTaskDTO.title
  //       task.description = updateTaskDTO.description
  //     }
  //     task.status = updateTaskDTO.status
  //   }

  //   return task
  // }

  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id)

    if(found) {
      await this.taskRespository.delete(id)
    }
  }

}
