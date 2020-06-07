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
  
  addPerson(name, contact, telephone, location, employees) {
    this.http.post(`${this.API}/customers`, {name, contact, telephone, location, employees})
    .subscribe(() => {
      this.getAllPeople();
    });
  }
  
  getAllPeople() {
    this.http.get(`${this.API}/customers`)
    .subscribe((people: any) => {
      console.log(people);
      this.people = people;
    });
  }
  
  deleteCustomer(id: string) {
    this.http.delete(`${this.API}/customers/${id}`)
      .subscribe((message: any) => {
        console.log(message);
        if (message) {
          this.getAllPeople();
        }
      });
  }
  
}
