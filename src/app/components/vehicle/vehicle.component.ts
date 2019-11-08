import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../models/Vehicle';
import {VehicleService} from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = null;
  showAdder: boolean = false;
  newVehicle: Vehicle = new Vehicle();
  idEdit: number = 0;
  color: string = '';
  dataBeg: string = '';
  dataEnd: string = '';
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.refresh();
  }

  delete(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle).subscribe(res => {
      this.refresh();
    });


  }

  showForm() {
    this.idEdit = 0;
    this.showAdder = !this.showAdder;
  }

  Edit(vehicle: Vehicle) {
    this.showAdder = false;
    if(vehicle.vehicleId === this.idEdit) {
      this.idEdit = 0;
    } else{
      this.idEdit = vehicle.vehicleId;
    }
  }

  addVehicle() {
    this.newVehicle.vehicleId = 0;
    this.vehicleService.addVehicle(this.newVehicle).subscribe(res => {
      this.refresh();
      this.showAdder = false;
      this.newVehicle.brand = '';
      this.newVehicle.model = '';
      this.newVehicle.color = '';
      this.newVehicle.productionYear = null;
    });

  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleService.updateVehicle(vehicle).subscribe(res=>{
      this.refresh();
      this.idEdit = 0;
    });
  }

  refresh() {
    if (this.dataBeg.length === 0 && this.dataEnd.length === 0) {
      this.vehicleService.getVehicles().subscribe(value => {
        this.vehicles = value;
      });
    } else if (this.dataBeg.length === 0) {
      this.vehicleService.getVehiclesByData('0' , this.dataEnd).subscribe(value => {
        this.vehicles = value;
      });

    } else if (this.dataEnd.length === 0 ) {
      this.vehicleService.getVehiclesByData(this.dataBeg , '99999999').subscribe(value => {
        this.vehicles = value;
      });
    } else {
      this.vehicleService.getVehiclesByData(this.dataBeg , this.dataEnd).subscribe(value => {
        this.vehicles = value;
      });
    }
}}
