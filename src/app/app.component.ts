import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ImagePipe } from './common/pipes/image.pipe';
import { FallbackDirective } from './common/directives/fallback.directive';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ReactiveFormsModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatListModule, 
    MatListItem, 
    MatProgressSpinnerModule, 
    CommonModule,
    ImagePipe,
    FallbackDirective,
    RouterModule
  ],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'adultsonly',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/adultsonly.svg')
    );
  }
}
