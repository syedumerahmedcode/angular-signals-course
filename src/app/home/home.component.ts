import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  //Adding # before a signal makes it private.
  #courses = signal<Course[]>([]);

  //   coursesService = inject(CoursesServiceWithFetch);
  coursesService = inject(CoursesService);

  beginnerCourses = computed(() => {
    // All dependencies of the signal must come at the start of the signal
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  advancedCourses = computed(() => {
    // All dependencies of the signal must come at the start of the signal
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'ADVANCED');
  });

  constructor() {
    effect(() => {
      console.log(`Begineer courses:`, this.beginnerCourses());
      console.log(`Advanced courses:`, this.advancedCourses());
    });

    this.loadCourses().then(() =>
      console.log(`All courses loaded: `, this.#courses())
    );
  }

  async loadCourses() {
    // this.coursesService
    //   .loadAllCourses()
    //   .then((courses) => this.courses.set(courses));
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      alert('Error loading courses');
      console.error(err);
    }
  }
}
