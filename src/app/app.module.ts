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
import { MaterialModule } from './material/material.module';
import { MatConfirmDialogComponent } from './tista/mat-confirm-dialog/mat-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { PaysService } from './general/services/pays.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PompesComponent } from './tista/pompes/pompes.component';
import { PompeComponent } from './tista/pompes/pompe/pompe.component';
import { PompeListComponent } from './tista/pompes/pompe-list/pompe-list.component';
import { PompeService } from './general/services/pompe.service';
import { StocksComponent } from './tista/stocks/stocks.component';
import { StockComponent } from './tista/stocks/stock/stock.component';
import { StockListComponent } from './tista/stocks/stock-list/stock-list.component';
import { StockService } from './general/services/stock.service';
import { ClientsComponent } from './tista/clients/clients.component';
import { ClientComponent } from './tista/clients/client/client.component';
import { ClientListComponent } from './tista/clients/client-list/client-list.component';
import { ClientService } from './general/services/client.service';
import { VentesComponent } from './tista/ventes/ventes.component';
import { VenteComponent } from './tista/ventes/vente/vente.component';
import { VenteListComponent } from './tista/ventes/vente-list/vente-list.component';
import { VenteService } from './general/services/vente.service';
import { DepensesComponent } from './tista/depenses/depenses.component';
import { DepenseComponent } from './tista/depenses/depense/depense.component';
import { DepenseListComponent } from './tista/depenses/depense-list/depense-list.component';
import { DepenseService } from './general/services/depense.service';

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pompes', component:PompesComponent},
  { path: 'stocks', component:StocksComponent},
  { path: 'clients', component:ClientsComponent},
  { path: 'ventes', component:VentesComponent},
  { path: 'depenses', component:DepensesComponent},
  //{ path: 'login', component: LoginComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    MatConfirmDialogComponent,
    PompesComponent,
    PompeComponent,
    PompeListComponent,
    StocksComponent,
    StockComponent,
    StockListComponent,
    ClientsComponent,
    ClientComponent,
    ClientListComponent,
    VentesComponent,
    VenteComponent,
    VenteListComponent,
    DepensesComponent,
    DepenseComponent,
    DepenseListComponent,
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
  providers: [PompeService, StockService, ClientService, VenteService, PaysService, DepenseService,  DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[PompeComponent, StockComponent, ClientComponent, VenteComponent, DepenseComponent, MatConfirmDialogComponent]
})
export class AppModule { }
