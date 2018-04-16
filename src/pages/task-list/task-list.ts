import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ActionSheetController, AlertController } from 'ionic-angular';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  tasks: { name: string }[] = [
    { name: 'タスク１' },
    { name: 'タスク２' },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {}

  ionViewWillEnter(){
    if(localStorage.getItem('tasks')){
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  changeTask(index: number){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        },{
          text: '変更',
          handler: () => {
            this._renameTask(index);
          }
        },{
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present(); 
  }

_renameTask(index: number){
  let prompt = this.alertCtrl.create({
    title: '変更後のタスク',
    inputs: [
      {
        name: 'task',
        placeholder: 'タスク',
        value: this.tasks[index].name
      },
    ],
    buttons: [
      {
        text: '閉じる'
      },
      {
        text: '保存',
        handler: data => {
          //タスクのindex番目を書き換え
          this.tasks[index] = { name:data.task };
          //localStorageに保存
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
      }
    ]
  });
  prompt.present();
}

}
