import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { Location } from '@angular/common';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  // selectedStudent: Student;
  students: Student[];
 
  constructor(
    private studentService: StudentService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getStudents();
  }

  // onSelectStudent(student: Student): void{
  //   this.selectedStudent = student;
  // }

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.studentService.addStudent({ name } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

  delete(student: Student): void{
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe();
  }

  goback() {
      this.location.back();
  }
}
