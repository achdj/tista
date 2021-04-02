import { Component, OnInit, ViewChild } from '@angular/core';
import { ApprovisionService } from 'src/app/general/services/approvision.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApprovisionComponent } from '../approvision/approvision.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CuveService } from 'src/app/general/services/cuve.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approvision-list',
  templateUrl: './approvision-list.component.html',
  styleUrls: ['./approvision-list.component.scss']
})
export class ApprovisionListComponent implements OnInit {

  constructor(
    private service: ApprovisionService,
    private cuveService: CuveService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['referenceApp', 'cuveRef', 'quantiteApp', 'coutTr', 'prixAchat', 'prixRevien', 'dateApp', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getApprovisions().subscribe(
      list => {
        let array = list.map(item => {
          let cuveRef = this.cuveService.getCuveRef(item.payload.val()['referenceC']);
          return {
            $key: item.key,
            cuveRef,
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
    this.dialog.open(ApprovisionComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(ApprovisionComponent, dialogConfig);
  }

  onDelete($key){
    /*if(confirm('Êtes-vous sûr de supprimer cet enregistrement?')){
      this.service.deleteCompagnie($key);
      this.notificationService.warn('! Supprimer avec succes');
    }*/

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteApprovision($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}

