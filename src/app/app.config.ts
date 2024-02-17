import { ApplicationConfig ,importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideAnimationsAsync(),
              importProvidersFrom(HttpClientModule,CommonModule,MatCardModule,FormControl,ReactiveFormsModule), 
              provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
              ]                  
};
