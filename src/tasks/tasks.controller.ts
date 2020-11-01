import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './DTO/create-task-dto'
import { UpdateTaskDTO } from './DTO/update-task-dto'

@Controller('tasks')
export class TasksController {
  constructor( private taskService: TasksService ) { }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string):Task {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO)
  }

  @Patch()
  updateTask(@Body() updateTaskDTO: UpdateTaskDTO): Task {
    return this.taskService.updateTask(updateTaskDTO)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id)
  }

}
