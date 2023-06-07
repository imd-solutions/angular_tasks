import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task-service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'CreateList',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {

  constructor(
    private taskService: TaskService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe({
      next: (resp) => this.createSuccess(resp),
      error:(err) => this.createFail(err)
    });
  }

  createSuccess(list: List) {    
    this.toastr.success('List created successfully!', 'SUCCESS');
    this.router.navigate([ 'application/lists', list.id ]); 
  }

  createFail(error: any) {
    this.toastr.error('Something has gone wrong!', 'ERROR');
  }

}