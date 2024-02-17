import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';


export const routes: Routes = [
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'repository-list', component: RepositoryListComponent },
  ];