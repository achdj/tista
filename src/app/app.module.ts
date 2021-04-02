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
import {MatMenuModule} from '@angular/material/menu'; 

import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
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
//pour boutique
import { BstatistiquesComponent } from './tista/boutiques/bstatistiques/bstatistiques.component';
import { BfacturesComponent } from './tista/boutiques/bfactures/bfactures.component';
import { BfactureListeComponent } from './tista/boutiques/bfactures/bfacture-liste/bfacture-liste.component';
import { BventesComponent } from './tista/boutiques/bventes/bventes.component';
import { BventeComponent } from './tista/boutiques/bventes/bvente/bvente.component';
import { BventeListeComponent } from './tista/boutiques/bventes/bvente-liste/bvente-liste.component';
import { BventeService } from './general/services/boutique/bvente.service';
import { BstocksComponent } from './tista/boutiques/bstocks/bstocks.component';
import { BstockComponent } from './tista/boutiques/bstocks/bstock/bstock.component';
import { BstockListeComponent } from './tista/boutiques/bstocks/bstock-liste/bstock-liste.component';
import { BstockService } from './general/services/boutique/bstock.service';
import { CuvesComponent } from './tista/cuves/cuves.component';
import { CuveComponent } from './tista/cuves/cuve/cuve.component';
import { CuveListComponent } from './tista/cuves/cuve-list/cuve-list.component';
import { CuveService } from './general/services/cuve.service';
import { PistoletsComponent } from './tista/pistolets/pistolets.component';
import { PistoletComponent } from './tista/pistolets/pistolet/pistolet.component';
import { PistoletListComponent } from './tista/pistolets/pistolet-list/pistolet-list.component';
import { PistoletService } from './general/services/pistolet.service';
import { ApprovisionsComponent } from './tista/approvisions/approvisions.component';
import { ApprovisionComponent } from './tista/approvisions/approvision/approvision.component';
import { ApprovisionListComponent } from './tista/approvisions/approvision-list/approvision-list.component';
import { ApprovisionService } from './general/services/approvision.service';

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'approvisions', component:ApprovisionsComponent},
  { path: 'cuves', component:CuvesComponent},
  { path: 'pompes', component:PompesComponent},
  { path: 'pistolets', component:PistoletsComponent},
  { path: 'stocks', component:StocksComponent},
  { path: 'clients', component:ClientsComponent},
  { path: 'ventes', component:VentesComponent},
  { path: 'depenses', component:DepensesComponent},
  { path: 'bstatistiques', component:BstatistiquesComponent},
  { path: 'bfactures', component:BfacturesComponent},
  { path: 'bventes', component:BventesComponent},
  { path: 'bstocks', component:BstocksComponent},
  
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
    BstatistiquesComponent,
    BfacturesComponent,
    BfactureListeComponent,
    BventesComponent,
    BventeComponent,
    BventeListeComponent,
    BstocksComponent,
    BstockComponent,
    BstockListeComponent,
    CuvesComponent,
    CuveComponent,
    CuveListComponent,
    PistoletsComponent,
    PistoletComponent,
    PistoletListComponent,
    ApprovisionsComponent,
    ApprovisionComponent,
    ApprovisionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatMenuModule,
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
    HttpClientModule,
    ChartsModule,
    NgApexchartsModule

  ],
  providers: [ApprovisionService, CuveService, PompeService, PistoletService, StockService, ClientService, VenteService, PaysService, DepenseService, BventeService, BstockService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[ApprovisionComponent, CuveComponent ,PompeComponent, PistoletComponent, StockComponent, ClientComponent, VenteComponent, DepenseComponent, BventeComponent, BstockComponent, MatConfirmDialogComponent]
})
export class AppModule { }
