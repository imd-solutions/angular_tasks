import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from 'src/app/services/task/task-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'TaskView',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists?: List[];
  tasks?: Task[];
  heading: string = "List Heading";

  selectedListId!: string;

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute, 
    private router: Router,
    private modalService: ModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.selectedListId = params['id'];
          this.taskService.getTasks(params['id']).subscribe({
            next: (resp) => this.tasks = resp
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe({      
      next: (resp) => this.lists = resp
    })
    
  }

  get userInfo() {
    let currentUser = JSON.parse(localStorage.getItem('user')!);
    return currentUser
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      // console.log("Completed successfully!");
      task.completed = !task.completed;
    })
  }

  openInformation(modalTemplate: TemplateRef<any>, task: Task) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: task.title, btnTxt: 'Done', description: task.description })
      .subscribe((action) => {
        console.log('modalAction', action);
        console.log('Task', task);
      });
  }

  onDeleteListClick() {
    if (confirm("Are you sure you would like to delete this list item?") == true) {
        this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
    }
  }

  onDeleteTaskClick(id: number) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks?.filter(task => task.id !== id);
      console.log(res);
    })
  }

}