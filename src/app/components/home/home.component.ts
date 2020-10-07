import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = {
    pendings: [],
    inProgress: [],
    done: [],
  };
  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}
  //servisimizi tanımıyoruz
  ngOnInit(): void {
    this.getAllTodos();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTodo();
  }
  addTodo(todo) {
    const obj = { todo: todo.value };
    this.todoService.addTodo(obj).subscribe(
      //subscribe ile sonucu yakalıyoruz acaba hata mı geliyor ne geliyor
      (res: any) => {
        this.openSnackBar(res.message);
        this.getAllTodos();
        todo.value = '';
      },
      (err) => {
        console.log(err);
      } //addTodo todo alacak,Serviste bir obje alacak demiştik todo içerisinde input değerini gönderecez
    );
  }
  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      (res) => {
        console.log(res);
        Object.keys(res).forEach((key) => {
          this.data[key] = res[key];
          console.log(key);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updateTodo() {
    this.todoService.updateTodo(this.data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeTodo(id) {
    if (confirm('Bu maddeyi silmek istediğinize emin misiniz?')) {
      this.todoService.removeTodo(id).subscribe(
        (res) => {
          console.log(res);
          this.getAllTodos();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'tamam', {
      duration: 2000,
    });
  }
}
