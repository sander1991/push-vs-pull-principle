import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pull',
    pathMatch: 'full',
  },
  {
    path: 'push',
    loadComponent: () =>
      import('./app/push-principle/push-principle.component').then(
        (m) => m.PushPrincipleComponent
      ),
  },
  {
    path: 'pull',
    loadComponent: () =>
      import('./app/pull-principle/pull-principle.component').then(
        (m) => m.PullPrincipleComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(routes),
      BrowserAnimationsModule,
      HttpClientModule,
    ]),
  ],
}).catch((err) => console.error(err));
