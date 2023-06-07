import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task/task-service';

@Component({
  selector: 'UpdateTask',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService, 
    private router: Router,    
    private toastr: ToastrService
  ) 
  {}

  task!: Task;
  taskId!: string;
  listId!: string;
  warning: boolean = false;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId'];
        this.listId = params['listId'];
      }
    )
    this.taskService.getTask(this.taskId).subscribe((res: any) => {
      this.task =  res;
    })
  }

  updateTask(title: string, description: string) {
    this.warning = false;

    if(!title) {
      this.warning = true;
      this.toastr.warning('Title is missing. Please complete.', 'WARNING');
      return
    }
    
    this.taskService.updateTask(this.listId, this.taskId, title, description).subscribe(() => {
      this.toastr.success('That has been updated.', 'SUCCESS');
      this.router.navigate(['/application/lists', this.listId]);
    })
  }

}