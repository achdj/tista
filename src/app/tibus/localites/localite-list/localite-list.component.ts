import { Component, OnInit, ViewChild } from '@angular/core';
import { CompagnieService } from 'src/app/general/services/compagnie.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocaliteComponent } from '../localite/localite.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';
import { PaysService } from 'src/app/general/services/pays.service';
import { LocaliteService } from 'src/app/general/services/localite.service';
import * as _ from 'lodash-es';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-localite-list',
  templateUrl: './localite-list.component.html',
  styleUrls: ['./localite-list.component.scss']
})
export class LocaliteListComponent implements OnInit {

  constructor(
    private service: LocaliteService,
    private compagnieService: CompagnieService,
    private paysService: PaysService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nom', 'compagnieNom', 'paysCompagnie', 'isActivate','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getLocalites().subscribe(
      list => {
        let array = list.map(item => {
          //var compagnieNom = this.compagnieService.getCompagnieNom();
          let compagnieNom = this.compagnieService.getCompagnieNom(item.payload.val()['compagnies']);
          //let compagniePays = this.paysService.getPaysNom(item.payload.val()['pays']);
          return {
            $key: item.key,
            compagnieNom,
            //compagniePays,
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
    this.dialog.open(LocaliteComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(LocaliteComponent, dialogConfig);
  }

  onDelete($key){
    /*if(confirm('Êtes-vous sûr de supprimer cet enregistrement?')){
      this.service.deleteCompagnie($key);
      this.notificationService.warn('! Supprimer avec succes');
    }*/

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteLocalite($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}
