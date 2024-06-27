import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Gender, Person } from '../../interfaces/person';
import { PersonService } from '../../services/person.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-create-edit-person',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressBarModule,
    MatCard,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es' }, provideNativeDateAdapter()],
  templateUrl: './create-edit-person.component.html',
  styleUrl: './create-edit-person.component.css'
})
export class CreateEditPersonComponent {
  loading: Boolean = false;
  form: FormGroup;
  persona!: Person;
  id: number;
  operacion: string = "Agregar "
  genders!: string[];
  constructor(private router: Router, private fb: FormBuilder, private _personService: PersonService, private aRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.genders = Object.keys(Gender).filter((item) => {
      return isNaN(Number(item));
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
    if (this.id != 0) {
      this.operacion = "Editar "
      this.getPerson(this.id);
    }


    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      gender: ['', Validators.required],
      img: ['']
    })
  }
  getPerson(id: number) {
    this.loading = true;
    this._personService.getPersona(id).subscribe(data => {
      this.form.patchValue({
        name: data.name,
        surname: data.surname,
        email: data.email,
        birthDate: data.birthDate,
        gender: data.gender,
        img: data.img
      })
      this.loading = false;
    })
  }
  addEditPerson() {
    const persona: Person = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      email: this.form.value.email,
      birthDate: this.form.value.birthDate,
      gender: Number(this.form.value.gender),
      img: this.form.value.img
    };
    if (this.id == 0) {
      this.addPerson(persona);
    }
    else {
      persona.id = this.id;
      this.editPerson(this.id, persona);
    }
  }
  addPerson(person: Person) {
    this._personService.addPersona(person).subscribe(() => {
      this._snackBar.open(`Persona Creada `, "", { duration: 3000 });
      this.router.navigate(['/listPerson'])
    })
  }
  editPerson(id: number, person: Person) {
    console.log(person)
    this._personService.updatePersona(id, person).subscribe(() => {
      this._snackBar.open(`Persona Editada `, "", { duration: 3000 });
      this.router.navigate(['/listPerson'])
    })
  }
}
