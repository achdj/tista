import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CompagnieComponent } from './compagnie/compagnie.component';
import { StationComponent } from './station/station.component';
import { TrajetComponent } from './trajet/trajet.component';
import { BusComponent } from './bus/bus.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ContactComponent } from './contact/contact.component';
import { BusAddComponent } from './bus/bus-add/bus-add.component';
import { BusEditComponent } from './bus/bus-edit/bus-edit.component';
import { CompagnieAddComponent } from './compagnie/compagnie-add/compagnie-add.component';
import { CompagnieEditComponent } from './compagnie/compagnie-edit/compagnie-edit.component';
import { ReservationAddComponent } from './reservation/reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation/reservation-edit/reservation-edit.component';
import { StationAddComponent } from './station/station-add/station-add.component';
import { StationEditComponent } from './station/station-edit/station-edit.component';
import { TrajetAddComponent } from './trajet/trajet-add/trajet-add.component';
import { TrajetEditComponent } from './trajet/trajet-edit/trajet-edit.component';

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compagnie', component: CompagnieComponent },
  { path: 'compagnie/add', component: CompagnieAddComponent },
  { path: 'compagnie/edit', component: CompagnieEditComponent },
  { path: 'station', component: StationComponent },
  { path: 'station/add', component: StationAddComponent },
  { path: 'station/edit', component: StationEditComponent },
  { path: 'trajet', component: TrajetComponent },
  { path: 'trajet/add', component: TrajetAddComponent },
  { path: 'trajet/edit', component: TrajetEditComponent },
  { path: 'bus', component: BusComponent },
  { path: 'bus/add', component: BusAddComponent },
  { path: 'bus/edit', component: BusEditComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'reservation/add', component: ReservationAddComponent },
  { path: 'reservation/edit', component: ReservationEditComponent },
  { path: 'contact', component: ContactComponent },
  //{ path: 'login', component: LoginComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    CompagnieComponent,
    StationComponent,
    TrajetComponent,
    BusComponent,
    ReservationComponent,
    ContactComponent,
    BusAddComponent,
    BusEditComponent,
    CompagnieAddComponent,
    CompagnieEditComponent,
    ReservationAddComponent,
    ReservationEditComponent,
    StationAddComponent,
    StationEditComponent,
    TrajetAddComponent,
    TrajetEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(approutes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatAutocompleteModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
