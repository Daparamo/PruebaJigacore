import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListPersonComponent } from "./components/list-person/list-person.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RouterOutlet, ListPersonComponent]
})
export class AppComponent {
  title = 'persona';
}
