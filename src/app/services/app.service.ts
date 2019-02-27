import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { planet } from '../models/planet.model';
import { vehicle } from '../models/vehicle.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    selectedPlanets: string[] = [];
    selectedVehicles: string[] = [];
  
    planetList: planet[];
    vehicleList: vehicle[];

    planetServiceSubject: Subject<any>;
    selectedPlanetChanged: Observable<any>;

    vehicleServiceSubject: Subject<any>;
    selectedVehicleChanged: Observable<any>;

    timeTaken : number[] = [];
    timeTakenServiceSubject : Subject<any>;
    timeTakenChanged : Observable<any>;

    constructor(private http: HttpClient) {
        this.planetServiceSubject = new Subject<any>();
        this.selectedPlanetChanged = this.planetServiceSubject.asObservable();

        this.vehicleServiceSubject = new Subject<any>();
        this.selectedVehicleChanged = this.vehicleServiceSubject.asObservable();

        this.timeTakenServiceSubject = new Subject<any>();
        this.timeTakenChanged = this.timeTakenServiceSubject.asObservable();

        this.planetList = [];
        this.vehicleList = [];
      
    }

    getPlanets() {
        return this.http.get<planet[]>(environment.planetUrl);
    }

    getVehicles() {
        return this.http.get<vehicle[]>(environment.vehicleUrl);
    }

    setPlanetList(pList: planet[]) {
        console.log("set planet", pList);
        this.planetList = pList;
        this.planetServiceSubject.next();
    }

    getPlanetList() {
        console.log("get planetList");
        let self = this;
        return this.planetList.filter((item) => {
            return self.selectedPlanets.indexOf(item.name) == -1
        });
    }

    setVehicleList(vList: vehicle[]) {
        this.vehicleList = vList;
        localStorage.setItem("vlist", JSON.stringify(vList));
        this.vehicleServiceSubject.next();
    }

    getVehicleList() {
        let remainingVList : vehicle[] = JSON.parse(localStorage.getItem("vlist"));
        for(let i=0;i<this.selectedVehicles.length;i++){
            let index = remainingVList.findIndex(x => x.name === this.selectedVehicles[i]);
        
            remainingVList[index].total_no = remainingVList[index].total_no - 1;
        }

        return remainingVList;
    }

    setSelectedPlanets(item: string, action: string) {
        if (action == "add") {
            if (item && this.selectedPlanets.indexOf(item) == -1) {
                this.selectedPlanets.push(item);
            }
        }
        else if (action == "delete") {
            let index = this.selectedPlanets.findIndex(x => x == item);
            if (index > -1)
                this.selectedPlanets.splice(index, 1);
        }

        this.planetServiceSubject.next();
        this.vehicleServiceSubject.next();
    }

    setSelectedVehicles(item:string, action:string){
        if (action == "add") {
            this.selectedVehicles.push(item);
        }
        else if (action == "delete") {
            let index = this.selectedVehicles.findIndex(x => x == item);
            if (index > -1)
                this.selectedVehicles.splice(index, 1);
        }

        this.vehicleServiceSubject.next();
    }

    setTimeTaken(time : number, action:string){
        if(action == "add"){
            this.timeTaken.push(time);
        }
        else if(action == "delete"){
            let index = this.timeTaken.findIndex(x => x == time);
            if (index > -1)
                this.timeTaken.splice(index, 1);
        }

        this.timeTakenServiceSubject.next();
    }

    getTimeTaken(){
        return this.timeTaken.length > 0 ? this.timeTaken.reduce((a, b) => a + b) : 0;
    }

}