import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { GetCoursesResponse } from '../models/get-courses.response';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  /**
   * If we do not want to use RxJS, then we have to return promise in our service class.
   * @returns
   */
  async loadAllCourses(): Promise<Course[]> {
    return [];
  }
}
