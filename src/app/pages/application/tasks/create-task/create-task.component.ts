import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'CreateTask',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService
  ) 
  {}

  listId!: number;
  tError: boolean = false;
  dError: boolean = false;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string, description: string) {
      this.tError = false
      this.dError = false
    if(!title && !description) {
      this.tError = true
      this.dError = true
      this.toastr.error('Missing data. Please update', 'ERROR');
      return      
    }
    if(!title) {
      this.tError = true
      this.toastr.error('Missing data. Please update', 'ERROR');
      return      
    }
    if(!description) {
      this.dError = true
      this.toastr.error('Missing data. Please update', 'ERROR'); 
      return    
    }
    this.taskService.createTask(title, description, this.listId).subscribe({
      next: (resp) => this.createTaskSuccess(resp),
      error: (err) => this.createTaskError(err)
    })
  }

  createTaskSuccess(resp: Task) {       
    this.toastr.success('Task created successfully!', 'SUCCESS');
    this.router.navigate(['/application/lists/', resp.listId], { relativeTo: this.route });
  }

  createTaskError(err: any) {}

}