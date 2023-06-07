import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/services/task/task-service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private taskService: TaskService, 
    private router: Router) 
  {}

  list!: List;
  listId!: string;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['id'];
        console.log(params['id']);
      }
    )
    this.taskService.getList(this.listId).subscribe((res: any) => {
      this.list =  res;
    })
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(() => {
      this.router.navigate(['/application/lists', this.listId]);
    })
  }

}