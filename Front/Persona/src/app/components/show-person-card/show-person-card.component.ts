import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Gender, Person } from '../../interfaces/person';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-person-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './show-person-card.component.html',
  styleUrl: './show-person-card.component.css'
})
export class ShowPersonCardComponent {
  loading: Boolean = false;
  id: number;
  persona!: Person;
  routeSub!: Subscription
  genders = Object.keys(Gender).filter((item) => {
    return isNaN(Number(item));
  });
  constructor(private _personService: PersonService, private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));

  }
  ngOnInit(): void {
    this.routeSub = this.aRoute.params.subscribe(data => {
      this.id = Number(data['id']);
      this.getPerson(this.id);
    })
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe()
  }
  getPerson(id: number) {
    this.loading = true;
    this._personService.getPersona(id).subscribe(data => {
      this.persona = data;
      this.loading = false;
    });
  }
}
