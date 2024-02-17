import { Component } from '@angular/core';
import { GithubService } from '../github.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCard, MatCardFooter, MatCardContent, MatCardHeader, MatCardTitle,
    MatCardSubtitle, MatProgressSpinnerModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  username: any = this.githubService.userame;
  userData: any;
  queries: string[] = [];
  searchResults: any[] = [];
  isLoading: boolean = false;

  constructor(private githubService: GithubService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.githubService.getUser(this.username).subscribe(
      (data) => {
        this.userData = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.showErrorMessage(error.message);
      }
    );
  }

  addInput(): void {
    this.queries.push('');
  }

  removeInput(index: number): void {
    this.queries.splice(index, 1);
  }

  //search for username
  search(): void {
    if (this.queries.some((query) => query.trim() !== '')) {
      const observables = this.queries
        .filter((query) => query.trim() !== '')
        .map((query) => this.githubService.getUser(query));

      forkJoin(observables).subscribe((results: any[]) => {
        this.searchResults = results.flatMap((result) => result.items);
      });
    }
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['mat-snackbar-error'], // Optional: Add a custom CSS class
    });
  }
}
