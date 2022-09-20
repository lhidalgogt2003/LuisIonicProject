import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentsData;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not
    // called due to view persistence in Ionic
    this.getAllStudents();
  }


  getAllStudents() {
    //Get saved list of students
    this.api.getStudentList().subscribe((response: any) => {
      console.log(response);
      this.studentsData = response.data;
    });
  }

  editStudent() {
    console.log('edit pressed');
  }

  addStudent() {
    console.log('add pressed');
  }

  deleteStudent(item) {
    //Delete item in Student data
    console.log(item);
    this.api.deleteStudent(item.id).subscribe((response) => {
      //Update list after delete is successful
      console.log(response);
      this.getAllStudents();
    });
  }

  backHome() {
    console.log('Back to home page');
    this.router.navigateByUrl('/home');
  }

}
