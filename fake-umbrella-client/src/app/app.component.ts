import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Fake Umbrella';
  API = 'http://localhost:3000';
  people: any[] = [];
  
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllPeople();
  }
  
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
    .subscribe(() => {
      this.getAllPeople();
    });
  }
  
  getAllPeople() {
    this.http.get(`${this.API}/users`)
    .subscribe((people: any) => {
      console.log(people);
      this.people = people;
    });
  }
}
