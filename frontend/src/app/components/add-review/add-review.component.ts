import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  ratingOptions = [{ value: 0, display: 'Kritikus' }, { value: 0.2, display: 'Erősen fejlesztendő' }, { value: 0.4, display: 'Fejlesztendő' }, { value: 0.6, display: 'Változó' }, { value: 0.8, display: 'Jó' }, { value: 1, display: 'Kiváló' }];
  priorityOptions = [{ value: 1, display: 'Alacsony' }, { value: 2, display: 'Közepes' }, { value: 3, display: 'Magas' }];
  employeeId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
  }

  reviewForm = this.fb.group({
    timeSpan: ['', Validators.required],
    goals: this.fb.array([
      this.fb.group({
        description: ['', Validators.required],
        priority: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
        rating: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      }),
      this.fb.group({
        description: ['', Validators.required],
        priority: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
        rating: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      }),
      this.fb.group({
        description: ['', Validators.required],
        priority: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
        rating: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      }),
    ]),
  });

  addGoal() {
    const goalArray = this.reviewForm.get('goals') as FormArray;
    if (goalArray.length < 10) {
      goalArray.push(this.fb.group({
        description: ['', Validators.required],
        priority: [0, [Validators.required, Validators.min(1), Validators.max(3)]],
        rating: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      }));
    } else {
      alert('Legfeljebb 10 célt tartalmazhat egy értékelés!');
    }
  }

  removeGoal(index: number) {
    const goalArray = this.reviewForm.get('goals') as FormArray;
    if (goalArray.length > 3) {
      goalArray.removeAt(index);
    } else {
      alert('Legalább 3 célt tartalmaznia kell egy értékelésnek!');
    }
  }

  get goals() {
    return this.reviewForm.get('goals') as FormArray;
  }

  onSubmit() {
    console.log(this.reviewForm.value);
    this.reviewForm.value.goals?.forEach((goal: any) => {
      goal.rating = +goal.rating;
      goal.priority = +goal.priority;
    });

    if (confirm('Biztosan hozzáadja az értékelést?')) {
      this.reviewService.addReview({ ...this.reviewForm.value, employee: this.employeeId }).subscribe({
        next: () => {
          alert('Sikeres mentés!');
          this.reviewForm.reset();
        },
        error: (err) => {
          console.log(err.message);
          alert('Hiba történt a mentés során!');
        },
      });
    }
  }


}
