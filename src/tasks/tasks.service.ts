import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/create-task-dto';
import { UpdateTaskDTO } from './DTO/update-task-dto';
import { GetTaskFilterDTO } from './DTO/get-task-filter-dto';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if (!found) {
      throw new NotFoundException(`No Task with ID ${id}`)
    }

    return found
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO)
  }

  async updateTask(updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.getTaskById(updateTaskDTO.id)

    if(task){
      if(updateTaskDTO.title && updateTaskDTO.description){
        task.title = updateTaskDTO.title
        task.description = updateTaskDTO.description
      }
      task.status = updateTaskDTO.status
      await task.save()
    }
    
    return task
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id)

    if(found) {
      await this.taskRepository.delete(id)
    }
  }

}
