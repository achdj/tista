import { Component, OnInit } from '@angular/core';
import { BstockService } from 'src/app/general/services/boutique/bstock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BstockComponent } from '../bstock/bstock.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bstock-liste',
  templateUrl: './bstock-liste.component.html',
  styleUrls: ['./bstock-liste.component.scss']
})
export class BstockListeComponent implements OnInit {

  constructor(
    private service: BstockService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
  ) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['description', 'priceU', 'quantity','actions'];
           @ViewChild(MatSort) sort: MatSort;
           @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getBstocks().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
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
    this.dialog.open(BstockComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(BstockComponent, dialogConfig);
  }

  onDelete($key){
    /*if(confirm('Êtes-vous sûr de supprimer cet enregistrement?')){
      this.service.deleteCompagnie($key);
      this.notificationService.warn('! Supprimer avec succes');
    }*/

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteBstock($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}
