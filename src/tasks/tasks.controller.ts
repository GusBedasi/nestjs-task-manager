import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './DTO/create-task-dto'
import { UpdateTaskDTO } from './DTO/update-task-dto'
import { GetTaskFilterDTO } from './DTO/get-task-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor( private taskService: TasksService ) { }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO): Task[] {
  //   if (Object.keys(filterDTO).length){
  //     return this.taskService.getFilterTask(filterDTO)
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDTO)
  }

  // @Patch()
  // updateTask(@Body(TaskStatusValidationPipe) updateTaskDTO: UpdateTaskDTO): Promise<Task> {
  //   return this.taskService.updateTask(updateTaskDTO)
  // }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void>{
    return this.taskService.deleteTask(id)
  }

}
