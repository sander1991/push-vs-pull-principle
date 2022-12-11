import { Component } from '@angular/core';
import { NavigationComponent } from './core/components/navigation/navigation.component';
import { Navigation } from './core/models/navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  concepts = [
    {
      title: 'Principles',
      path: 'pull',
      open: true,
      childrens: [
        {
          title: 'Pull',
          path: 'pull',
        },
        { title: 'Push', path: 'push' },
      ],
    },
  ] as Navigation[];
}
