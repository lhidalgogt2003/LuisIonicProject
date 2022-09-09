import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Student } from 'src/app/api.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.page.html',
  styleUrls: ['./student-create.page.scss'],
})
export class StudentCreatePage implements OnInit {
  
  data: Student;
  constructor(private api: ApiService, private router: Router) {
    this.data = new Student();
   }

  ngOnInit() {
  }

  backHome(){
    console.log('Back to home page');
    this.router.navigateByUrl('/student-list');
  }

  addStudent() {
    console.log(this.data);
    this.api.createStudent(this.data).subscribe((response) => {
      this.router.navigate(['student-list']);
    });
  }

}
