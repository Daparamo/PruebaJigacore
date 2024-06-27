import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Persona/';
  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  getPersona(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  addPersona(persona: Person): Observable<Person> {
    return this.http.post<Person>(`${this.myAppUrl}${this.myApiUrl}`, persona)
  }
  updatePersona(id: number, persona: Person): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, persona);
  }
}
