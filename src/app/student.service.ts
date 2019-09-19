import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Student } from './student';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = 'api/students';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getStudents(): Observable<Student[]> {
    // this.messageService.add('Student List Fetched Successfully');
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('Student List Fetched Successfully')),
        catchError(this.handleError<Student[]>('getstudents', []))
      );
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`Student id=${id} Fetched Successfully`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions)
      .pipe(
        tap((newStudent: Student) => this.log(`Student Added with id=${newStudent.id} & Name=${newStudent.name}`)),
        catchError(this.handleError<Student>('addStudent'))
      );
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student, this.httpOptions)
      .pipe(
        tap(_ => this.log(`Detail Updates for Student id=${student.id}`)),
        catchError(this.handleError<any>('updateStudent'))
      );
  }

  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Student Deleted Id = ${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  private log(message: string) {
    this.messageService.add(`${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
