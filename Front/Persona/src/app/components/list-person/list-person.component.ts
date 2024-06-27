import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
//angular material
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Gender, Person } from '../../interfaces/person';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { PersonService } from '../../services/person.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-list-person',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.css'
})
export class ListPersonComponent implements AfterViewInit {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['photo', 'name', 'surname', 'email', 'phone', 'address', 'action'];
  dataSource: MatTableDataSource<Person, MatPaginator>;
  loading: Boolean = false;
  genders = Object.keys(Gender).filter((item) => {
    return isNaN(Number(item));
  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _personService: PersonService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  getPerson() {
    this.loading = true;
    this._personService.getPersonas().subscribe(data => {
      this.dataSource.data = data;
      this.loading = false;
      if (data.length == 0) {
        this.router.navigate(['/addPerson'])
      }
    }, error => {
      this.loading = false;
      this._snackBar.open('Error al obtener la lista de personas', 'Cerrar')
    })
  }

  ngOnInit(): void {
    this.getPerson();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por página"
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  eliminarPersona(id: number) {
    this.openDialog().afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this._personService.deletePersona(id).subscribe(() => {
          this._snackBar.open("Persona Eliminada", "", { duration: 3000 });
          this.loading = false;
          this.getPerson();
        });
      }
    });
  }


  openDialog(): MatDialogRef<Dialog> {
    return this.dialog.open(Dialog, {
      data: { Title: "Eliminar Persona", Message: "¿Estás seguro que deseas eliminar la persona?" }
    });
  }

}
