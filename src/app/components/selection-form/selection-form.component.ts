import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { planet } from '../../models/planet.model';
import { vehicle } from '../../models/vehicle.model';

@Component({
    selector: 'app-selection-form',
    templateUrl: 'selection-form.component.html',
    styleUrls:['./selection-form.component.css']
})

export class SelectionFormComponent implements OnInit {
    selectedPlanet : string = "";
    planetList : planet[];
    vehicleList : vehicle[];

    constructor(private _appService : AppService) {
     }

    ngOnInit() { 
        this.getPlanetList();
        this.getVehicleList();
    }

    getPlanetList(){
        let self = this;
        this._appService.planetServiceSubject.subscribe(() => {
            this.planetList = this._appService.getPlanetList();
            if(this.selectedPlanet)
              this.planetList = [{"name" : this.selectedPlanet.split('-')[0], "distance" : parseInt(this.selectedPlanet.split('-')[1])} ,...this.planetList];
        });
    }

    getVehicleList(){
        this._appService.vehicleServiceSubject.subscribe(() =>{
            this.vehicleList = this._appService.getVehicleList();
            console.log(this.vehicleList);
        });
    }

    updateSelectedPlanet(){
        this._appService.setSelectedPlanets(this.selectedPlanet.split('-')[0]);
    }
}