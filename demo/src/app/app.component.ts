import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs';
import {
  calculateRecommendedNumberOfConsumers,
  calculateRecommendedNumberOfPartitions
} from '@xeotekofficial/topic-partition-calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup = new FormGroup({
    B: new FormControl<number>(3, Validators.required),
    P: new FormControl<number>(50, Validators.required),
    C: new FormControl<number>(1, Validators.required),
    T: new FormControl<number>(0.006, Validators.required)
  });

  results$ = this.formGroup.valueChanges.pipe(
    startWith(this.formGroup.value),
    map((values) => {
      if (this.formGroup.invalid) return 'All fields are required.';
      const producers = calculateRecommendedNumberOfPartitions(values as any);
      const consumers = calculateRecommendedNumberOfConsumers(values as any);
      return `
      The recommended number of <i>partitions</i> for this topic is <b>${producers}</b>
      <br>
      The recommended number of <i>consumers</i> for this topic is <b>${consumers}</b>
      `;
    })
  );
}
