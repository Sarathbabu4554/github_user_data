import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../github.service';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-repository-list',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardFooter, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle, FlexLayoutModule,
    FlexModule, MatButtonModule, MatIcon, MatProgressSpinnerModule],
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.scss'
})
export class RepositoryListComponent {
  username: any = this.githubService.userame;
  repositories: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private githubService: GithubService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    // this.username = params.get('username');
    this.fetchRepositories();
    // });
  }

 //fetch repo data
  fetchRepositories(): void {
    this.repositories = [];
    this.isLoading = true;
    this.githubService.getUserRepositories(this.username, this.currentPage).subscribe((repos) => {
      this.repositories = repos;
      this.isLoading = false;
    }, (error) => {
      console.error('Error fetching user data:', error);
      this.showErrorMessage(error.message);
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.fetchRepositories();
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