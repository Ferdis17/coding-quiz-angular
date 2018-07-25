import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from './service/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  taskList = [];
  taskForm: FormGroup;
  formSubmitted: boolean;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getTaskData().then( res => {
      this.taskList = res;
    });
    this.generateForm();
  }

  generateForm(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required, this.dateValidator]),
      assigned: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // reformat html5 input date to match existing model
    const inputDate = this.taskForm.value.date;
    const dateArr = inputDate.split('-');
    this.taskForm.value.date =   dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];
    this.taskService.addTask(this.taskForm.value);
    this.formSubmitted = true;
    this.generateForm();
  }

  dateValidator(control: FormControl): { [key: string]: boolean } {
    const isValidDate = Date.parse(control.value);
    if (isNaN(isValidDate)) {
      return { 'dateInvalid': false };
    }
    return null;
  }

}
