import { HomeComponent } from './components/home/home.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from "./components/root/root.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelectionFormComponent } from './components/selection-form/selection-form.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

import { AppService } from './services/app.service';
import { routes } from "./root.routes";


@NgModule({
    imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
    declarations: [RootComponent, HeaderComponent, FooterComponent, HomeComponent, NotFoundComponent, SelectionFormComponent, VehiclesComponent ],
    bootstrap: [RootComponent]
})
export class RootModule { }