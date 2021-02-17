import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DatePipe } from '@angular/common';
import { CompagnieService } from 'src/app/general/services/compagnie.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { from } from 'rxjs';
import { CompagniesComponent } from './tibus/compagnies/compagnies.component';
import { CompagnieComponent } from './tibus/compagnies/compagnie/compagnie.component';
import { MaterialModule } from './material/material.module';
import { CompagnieListComponent } from './tibus/compagnies/compagnie-list/compagnie-list.component';
import { MatConfirmDialogComponent } from './tibus/mat-confirm-dialog/mat-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { PaysService } from './general/services/pays.service';
import { LocalitesComponent } from './tibus/localites/localites.component';
import { LocaliteComponent } from './tibus/localites/localite/localite.component';
import { LocaliteService } from 'src/app/general/services/localite.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocaliteListComponent } from './tibus/localites/localite-list/localite-list.component';
import { StationsComponent } from './tibus/stations/stations.component';
import { StationComponent } from './tibus/stations/station/station.component';
import { StationListComponent } from './tibus/stations/station-list/station-list.component';
import { StationService } from './general/services/station.service';
import { VehiculesComponent } from './tibus/vehicules/vehicules.component';
import { VehiculeComponent } from './tibus/vehicules/vehicule/vehicule.component';
import { VehiculeListComponent } from './tibus/vehicules/vehicule-list/vehicule-list.component';
import { VehiculeService } from './general/services/vehicule.service';

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compagnies', component:CompagniesComponent},
  { path: 'localites', component:LocalitesComponent},
  { path: 'stations', component:StationsComponent},
  { path: 'vehicules', component:VehiculesComponent},
  //{ path: 'login', component: LoginComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    CompagniesComponent,
    CompagnieComponent,
    CompagnieListComponent,
    MatConfirmDialogComponent,
    LocalitesComponent,
    LocaliteComponent,
    LocaliteListComponent,
    StationsComponent,
    StationComponent,
    StationListComponent,
    VehiculesComponent,
    VehiculeComponent,
    VehiculeListComponent
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
    MatGridListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(approutes),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatAutocompleteModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    CommonModule,
    MaterialModule,
    HttpClientModule

  ],
  providers: [CompagnieService, PaysService, LocaliteService, StationService, VehiculeService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[CompagnieComponent, LocaliteComponent, StationComponent, VehiculeComponent, MatConfirmDialogComponent]
})
export class AppModule { }
