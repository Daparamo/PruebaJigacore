import { Routes } from '@angular/router';
import { ListPersonComponent } from './components/list-person/list-person.component';
import { CreateEditPersonComponent } from './components/create-edit-person/create-edit-person.component';
import { ShowPersonCardComponent } from './components/show-person-card/show-person-card.component';

export const routes: Routes = [
  { path: '', redirectTo: "listPerson", pathMatch: "full" },
  { path: 'listPerson', component: ListPersonComponent },
  { path: 'addPerson', component: CreateEditPersonComponent },
  { path: 'editPerson/:id', component: CreateEditPersonComponent },
  { path: 'showPerson/:id', component: ShowPersonCardComponent },
  // { path: '**', redirectTo: "listPerson", pathMatch: "full" }
];
