import { TaskStatus } from "../task-status.enum";

export class UpdateTaskDTO {
  id: number
  title ?: string;
  description ?: string;
  status: TaskStatus}
