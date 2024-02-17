import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { GithubService } from './github.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatIconModule, MatOption, MatSelectModule, MatFormFieldModule,
    ReactiveFormsModule, MatProgressSpinnerModule, MatListModule,
    MatSidenavModule, MatToolbarModule, FlexLayoutModule, FlexModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'github-profile-viewer';
  options: any[] = [];
  selectedOption = new FormControl();
  isLoading: boolean = false;
  userData: any;
  constructor(private GithubService: GithubService, private snackBar: MatSnackBar, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.GithubService.getalluserData().subscribe(
      (data) => {
        this.userData = data;
        this.pushOption(this.userData);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.showErrorMessage(error.message);
      }
    );
  }

  // selected user name
  onSelectOpened(e: any) {
    this.GithubService.userame = e.value;
  }

  // push user name
  pushOption(allusr: any) {
    allusr.forEach((element: any, i: any) => {
      this.options.push(element.login)
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['mat-snackbar-error'], // Optional: Add a custom CSS class
    });
  }

  // errormessage for user
  errorMsg() {
    if (!this.GithubService.userame) {
      this.showErrorMessage("Please Select Github user")
    }
  }
}
