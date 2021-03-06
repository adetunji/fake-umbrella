import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import config from '../config/config';
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {map, flatMap, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  private chartOptions: Highcharts.Options;
  private api = 'http://localhost:3000';
  private openweatherURL: string;
  private apiKey: string;
  customers: any[] = [];
  
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.openweatherURL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    this.getAllCustomers();
    this.apiKey = config.key;
    // this.getWeatherInfo();
  }
  
  public addPerson(name, contact, telephone, location, employees) {
    this.http.post(`${this.api}/customers`, {name, contact, telephone, location, employees})
    .subscribe(() => {
      this.getAllCustomers();
    });
  }
  
  public getAllCustomers() {
    this.http.get(`${this.api}/customers`)
    .subscribe((customers: any) => {
      // this.customers = customers;
      _.each(customers, (customer) => {
        this.getWeatherInfo(customer.location)
          .subscribe((res) => {
            console.log(res);
            customer.weatherInfo = res;
            this.customers.push(customer);
            console.log(this.customers);
          });
      });
      // this.getCustomerData().subscribe(res => console.log(res));
      // this.createChart(customerData);
    });
  }
  
  
  public deleteCustomer(id: string) {
    this.http.delete(`${this.api}/customers/${id}`)
      .subscribe((message: any) => {
        console.log(message);
        if (message) {
          this.getAllCustomers();
        }
      });
  }
  
  public getWeatherInfo(city): Observable<any> {
    let weatherFind: any;
    // let item = new Observable()
    return this.http.get(`${this.openweatherURL}${city}&appid=${this.apiKey}`)
      .pipe(map((res: any) => {
        // console.log(city);
        // return res;
        return  weatherFind = _.find(res.list, (weather: any) => {
              return ((weather.weather[0].id >= 200 && weather.weather[0].id <= 232)
                || (weather.weather[0].id >= 300 && weather.weather[0].id <= 321) ||
                (weather.weather[0].id >= 500 && weather.weather[0].id <= 531));
            });
      }));
  }
  
  public getCustomerData(): Observable<any> {

    // return of(this.customers.map((elem) => {
    //     // //   return this.getWeatherInfo(elem.location)
    //     // //     .subscribe(res => res);
    //     // //     // .then(res => return res)
    //     //   return this.getWeatherInfo(elem)
    //     //     .pipe(flatMap((el) => {
    //     //       return el;
    //     //     })}));
    // return of(this.customers.map((elem) => {
    //   this.getWeatherInfo(elem.location)
    //     .pipe(mergeMap((e) => {
    //       console.log(e);
    //       return e;
    //     }));
    // }));
    return of(this.customers.map((elem) => elem))
      .pipe(mergeMap((e) => {
        return e;
      }));
  }
  
  
  createChart(customerData, customerNames) {
   this.chartOptions = {
     title: {
       text: 'Fake Umbrella Chart',
     },
     xAxis: {
       categories: customerNames,
       title: {
         text: 'Customer Name'
       }
     },
     yAxis: {
       title: {
         text: 'Number of Employees'
       }
     },
      series: [{
        data: customerData,
        type: 'column'
      }]
    };
  }
}
