import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';


interface Ivalue {
  id: string;
  status: string;
}

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];
  
  transform(value: Ivalue) {
    const { id } = value
    let { status } = value
    status = status.toUpperCase();
    
    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`"${status}" is an invalid status`)
    }
    
    return {id, status};
  }
  
  private isStatusValid(status: any) {
    const validationResponse = this.allowedStatuses.indexOf(status)
    return validationResponse !== -1
  }
}