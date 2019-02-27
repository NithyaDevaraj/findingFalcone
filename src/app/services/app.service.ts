import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { planet } from '../models/planet.model';
import { vehicle } from '../models/vehicle.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AppService {

    selectedPlanets : any = {};
    selectedVehicles : string[] = [];

    planetList : planet[];
    vehicleList : vehicle[]; 

    planetServiceSubject: Subject<any>;
    selectedPlanetChanged: Observable<any>;

    vehicleServiceSubject: Subject<any>;
    selectedVehicleChanged: Observable<any>;

    constructor(private http : HttpClient) { 
        this.planetServiceSubject = new Subject<any>();
        this.selectedPlanetChanged = this.planetServiceSubject.asObservable();

        this.vehicleServiceSubject = new Subject<any>();
        this.selectedVehicleChanged = this.vehicleServiceSubject.asObservable();

        this.planetList = [];
        this.vehicleList = [];
    }

    getPlanets(){
        return this.http.get<planet[]>(environment.planetUrl);
    }

    getVehicles(){
        return this.http.get<vehicle[]>(environment.vehicleUrl);
    }

    setPlanetList(pList : planet[]){
        console.log("set planet", pList);
        this.planetList = pList;
        this.planetServiceSubject.next();
    }

    getPlanetList(){
        console.log("get planetList");
        let self = this;
        return this.planetList.filter((item) =>{
            debugger;
            return Object.keys(self.selectedPlanets).indexOf(item.name) == -1
        });
    }

    setVehicleList(vList : vehicle[]){
        this.vehicleList = vList;
        this.vehicleServiceSubject.next();
    }

    getVehicleList(){
        console.log("get vehicleList");
        let remainingVList = this.vehicleList;
        for(let item of this.selectedVehicles){
           let index = this.vehicleList.findIndex(x=>x.name === item);
           remainingVList[index].total_no -= 1;
        }

        return remainingVList;
    }

    setSelectedPlanets(item:string){
        console.log("set selected Planet");
        if(item && Object.keys(this.selectedPlanets).indexOf(item) == -1){
            this.selectedPlanets[item] = 1;
            this.planetServiceSubject.next();
        }
    }

}