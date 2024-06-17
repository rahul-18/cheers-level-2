import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainModule } from './main-module/main.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MainModule],
  templateUrl: 'app.component.html',
})
export class AppComponent {}
