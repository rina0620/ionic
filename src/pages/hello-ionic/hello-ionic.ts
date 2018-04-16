import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  title: string = 'タスク登録';
  tasks: { name: string }[] = [
    { name: 'タスク１' },
    { name: 'タスク２' },
  ];
  task: string;
  constructor() {

  }

  ionViewWillEnter(){
    if(localStorage.getItem('tasks')){
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

addTask(){
  this.tasks.push({
    name: this.task
  });
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
  this.task = '';
}

}
