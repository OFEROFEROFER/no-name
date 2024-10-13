import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit {

  @Input() votes!:number
  @Input() rating!: number;
  ratingByStars!:number


  ngOnInit(): void {
   this.ratingByStars = this.rating/2;
  }

}
