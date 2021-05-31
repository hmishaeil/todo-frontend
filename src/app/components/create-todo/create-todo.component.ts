import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/Todo.model';
import { AuthService } from 'src/app/_services/auth.service';
import { TodoService } from '../../_services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todo: Todo;
  userId;

  constructor(
    private todoService: TodoService, 
    private authService: AuthService,
    private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = this.authService.USER$.value.userId;
    this.todo = new Todo;
  }

  onCreate(){
    this.todoService.createTodo(this.userId, this.todo).subscribe(res => {
      this.toastr.success(this.todo.name + " created.")
      this.router.navigate([`/users/${this.userId}/todos`]);
    });
  }

}
