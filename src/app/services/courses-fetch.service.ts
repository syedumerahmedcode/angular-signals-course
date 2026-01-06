import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesServiceWithFetch {
  env = environment;

  async loadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();
    return payload.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const response = await fetch(`${this.env.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    return await response.json();
  }

  async saveCourse(
    courseId: String,
    changes: Partial<Course>
  ): Promise<Course> {
    const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changes),
    });
    return await response.json();
  }

  async deleteCourse(courseId: String): Promise<void> {
    const response = await fetch(`${this.env.apiRoot}/courses/${courseId}`, {
      method: 'DELETE',
    });
    // return await response.json();
  }
}
