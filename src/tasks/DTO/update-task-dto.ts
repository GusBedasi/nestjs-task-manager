import { TaskStatus } from "../task.model";

export class UpdateTaskDTO {
  id: string
  title ?: string;
  description ?: string;
  status: TaskStatus}
