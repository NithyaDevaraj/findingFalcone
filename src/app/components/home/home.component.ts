import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
   
    constructor(private _appService : AppService) { }

    ngOnInit() { 
        this.getPlanets();
        this.getVehicles();
    }

    getPlanets(){
        this._appService.getPlanets().subscribe((res) =>{
            this._appService.setPlanetList(res);
        }, (error) =>{
            console.log("Error occured while fetching the planets", error);
        });
    }

    getVehicles(){
        this._appService.getVehicles().subscribe((res) =>{
            this._appService.setVehicleList(res);
        }, (error) =>{
            console.log("Error occured while fetching the vehicles", error);
        });
    }
}