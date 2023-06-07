import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { ApiService } from '../api/api.service';
import { List } from 'src/app/models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private apiService: ApiService
  ) {}


  getLists(): Observable<any> {
    return this.apiService.get('lists');
  }

  getList(id: string): Observable<any> {
    return this.apiService.get(`lists/${id}`);
  }

  createList(title: string): Observable<any>  {
    // We want to send a web request to create a list
    return this.apiService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.apiService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string, description: string) {
    // We want to send a web request to update a list
    return this.apiService.patch(`tasks/${taskId}`, { title, description });
  }

  deleteTask(listId: string, taskId: number) {
    return this.apiService.delete(`tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.apiService.delete(`lists/${id}`);
  }

  getTasks(listId: string): Observable<any> {
    return this.apiService.get(`lists/${listId}/tasks`);
  }

  getTask(taskId: string): Observable<any> {
    return this.apiService.get(`tasks/${taskId}`);
  }

  createTask(title: string, description: string, listId: number): Observable<any>  {
    // We want to send a web request to create a task
    return this.apiService.post(`lists/${listId}/tasks`, { title, description , completed: false});
  }

  complete(task: Task) {
    return this.apiService.patch(`tasks/${task.id}`, {
      completed: !task.completed
    });
  }
}