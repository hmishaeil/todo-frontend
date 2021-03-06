import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/models/Todo.model';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      url => {
        this.userId = url.userId;
      }
    )
    this.todo = new Todo;
  }

  onCreate() {
    this.todoService.createTodo(this.userId, this.todo).subscribe(res => {
      this.toastr.success(this.todo.name + " created.")
      this.router.navigate([`/users/${this.userId}/todos`]);
    });
  }

}
