import { EntityRepository, Repository } from "typeorm";
import { Task } from '../task.entity';
import { CreateTaskDTO } from '../DTO/create-task-dto';
import { TaskStatus } from '../task-status.enum';
import { GetTaskFilterDTO } from '../DTO/get-task-filter-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  
  async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', {status})
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
    }

    const tasks = await query.getMany()
    return tasks
  }
  
  async createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO

    const task = new Task();
    task.title = title
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()
    
    return task
  }
}
