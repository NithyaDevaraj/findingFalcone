import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    totalTimeTaken: number = 0;
    isValidForSendingRequest : boolean = false;

    constructor(private _appService: AppService) { 
        this.getTimeTaken();
    }

    ngOnInit() {
        this.getPlanets();
        this.getVehicles();
    }

    getPlanets() {
        this._appService.getPlanets().subscribe((res) => {
            this._appService.setPlanetList(res);
        }, (error) => {
            console.log("Error occured while fetching the planets", error);
        });
    }

    getVehicles() {
        this._appService.getVehicles().subscribe((res) => {
            this._appService.setVehicleList(res);
        }, (error) => {
            console.log("Error occured while fetching the vehicles", error);
        });
    }

    getTimeTaken() {
        debugger;
        this._appService.timeTakenServiceSubject.subscribe((tt) => {
            this.totalTimeTaken = this._appService.getTimeTaken().totalTime;
            if(this._appService.getTimeTaken().length === 4)
                this.isValidForSendingRequest = true;
            else
                this.isValidForSendingRequest = false;
        });
    }

    findFalcone(){
        this._appService.findFlacone().subscribe((result) =>{
            console.log(result);
        });
    }
}