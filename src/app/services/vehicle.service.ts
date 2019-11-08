import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Vehicle} from '../models/Vehicle';


const httpOptions = {
  headers: new HttpHeaders({
    'Content_Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  apiUrl: string = 'https://limitless-wildwood-16039.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.apiUrl, httpOptions);

  }

  getVevicle(id: number): Observable<Vehicle>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vehicle>(url, httpOptions);
  }

  getVehiclesByData(dataBeg: string, dataEnd: string): Observable<Vehicle[]>{
    const url = `${this.apiUrl}between/?dataBeg=${dataBeg}&dataEnd=${dataEnd}`;
    return this.http.get<Vehicle[]>(url, httpOptions);
  }

  addVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.post(this.apiUrl, vehicle, httpOptions);
  }

  updateVehicle(vehicle: Vehicle): Observable<any>{
    const url = `${this.apiUrl}${vehicle.vehicleId}`;
    return this.http.put(url, vehicle, httpOptions);
  }
  deleteVehicle(vehicle: Vehicle): Observable<any>{
    const url = `${this.apiUrl}${vehicle.vehicleId}`;
    return this.http.delete(url, httpOptions);
  }

}
