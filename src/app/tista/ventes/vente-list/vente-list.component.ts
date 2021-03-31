import { Component, OnInit, ViewChild } from '@angular/core';
import { VenteService } from 'src/app/general/services/vente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VenteComponent } from '../vente/vente.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vente-list',
  templateUrl: './vente-list.component.html',
  styleUrls: ['./vente-list.component.scss']
})
export class VenteListComponent implements OnInit {

  constructor(
    private service: VenteService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['priceU', 'Qte', 'remise', 'perte', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getVentes().subscribe(
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
    this.dialog.open(VenteComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(VenteComponent, dialogConfig);
  }

  onDelete($key){
    /*if(confirm('Êtes-vous sûr de supprimer cet enregistrement?')){
      this.service.deleteCompagnie($key);
      this.notificationService.warn('! Supprimer avec succes');
    }*/

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deleteVente($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}

