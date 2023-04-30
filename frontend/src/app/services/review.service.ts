import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  BASE_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getReview(id: string) {
    const url = `${this.BASE_URL}review/${id}`;

    return this.http.get(url)
      .pipe(
        map(response => {
          return response as Review;
        })
      );
  }

  addReview(review: any) {
    const url = `${this.BASE_URL}review`;

    return this.http.post(url, review)
      .pipe(
        map(response => {
          return response as Review;
        })
      );
  }
}
