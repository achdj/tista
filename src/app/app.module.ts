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
/*import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';*/
//import { MatTableDataSource } from '@angular/material/table';
//import { MatSort } from '@angular/material/sort';
//import { MatPaginator } from '@angular/material/paginator';
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

const approutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compagnies', component:CompagniesComponent},
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
    MatConfirmDialogComponent
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
    //MatSort,
    //MatPaginator,
    MaterialModule

  ],
  providers: [CompagnieService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[CompagnieComponent, MatConfirmDialogComponent]
})
export class AppModule { }
