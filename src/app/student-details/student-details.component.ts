import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit {

  @Input() student: Student;

  constructor(
    private studentService:StudentService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

    ngOnInit(): void {
      this.getStudent();
    }
    
    getStudent(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.studentService.getStudent(id)
        .subscribe(student => this.student = student);
    }

    goBack() {
      this.location.back();
    }

    Save(): void {
      this.studentService.updateStudent(this.student)
        .subscribe(() => this.goBack());
    }
}
