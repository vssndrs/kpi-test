import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  review$: Observable<Review> = this.activatedRoute.params.pipe(
    switchMap(params => this.reviewService.getReview(params['id']))
  );

  translateRating(rating: number) {
    switch (rating) {
      case 0:
        return 'Kritikus';
      case 0.2:
        return 'Erősen fejlesztendő';
      case 0.4:
        return 'Fejlesztendő';
      case 0.6:
        return 'Változó';
      case 0.8:
        return 'Jó';
      case 1:
        return 'Kiváló';
      default:
        return 'Nem értékelt';
    }
  }

  translatePriority(priority: number) {
    switch (priority) {
      case 1:
        return 'Alacsony';
      case 2:
        return 'Közepes';
      case 3:
        return 'Magas';
      default:
        return 'Nem értékelt';
    }
  }

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
