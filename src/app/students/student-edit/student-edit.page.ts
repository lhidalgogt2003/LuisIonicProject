import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/app-models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.page.html',
  styleUrls: ['./student-edit.page.scss'],
})
export class StudentEditPage implements OnInit {

  id: number;
  data: Student;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data = new Student();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    //get item details using id
    this.apiService.getStudent(this.id).subscribe((response: any) => {
      console.log(response);
      this.data = response.data.attributes;
    });
  }

  update() {
    //Update item by taking id and updated data object
    this.apiService.updateStudent(this.id, this.data).subscribe(response => {
      this.router.navigate(['student-list']);
    });
  }
}
