import { Component, OnInit, ViewChild } from '@angular/core';
import { TrajetService } from 'src/app/general/services/trajet.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrajetComponent } from '../trajet/trajet.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';
import { CompagnieService } from 'src/app/general/services/compagnie.service';
import { StationService } from 'src/app/general/services/station.service';

@Component({
  selector: 'app-trajet-list',
  templateUrl: './trajet-list.component.html',
  styleUrls: ['./trajet-list.component.scss']
})
export class TrajetListComponent implements OnInit {

  constructor(
    private service: TrajetService,
    private compagnieService: CompagnieService,
    private stationService: StationService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nom', 'compagnieNom', 'stationDepart', 'stationArrive', 'coutTrajet', 'distance', 'isActivate', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getTrajets().subscribe(
      list => {
        let array = list.map(item => {
          let compagnieNom = this.compagnieService.getCompagnieNom(item.payload.val()['compagnies']);
          let stationDepart = this.stationService.getStationNom(item.payload.val()['stations']);
          let stationArrive = this.stationService.getStationNom(item.payload.val()['stations']);
          return {
            $key: item.key,
            compagnieNom,
            stationDepart,
            stationArrive,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        /*this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };*/
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TrajetComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(TrajetComponent, dialogConfig);
  }

  onDelete($key){

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteTrajet($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}
