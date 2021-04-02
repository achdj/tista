import { Component, OnInit, ViewChild } from '@angular/core';
import { PistoletService } from 'src/app/general/services/pistolet.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PistoletComponent } from '../pistolet/pistolet.component';
import { NotificationService } from 'src/app/general/services/notification.service';
import { DialogService } from 'src/app/general/services/dialog.service';
import { CommonModule } from '@angular/common';
import { CuveService } from 'src/app/general/services/cuve.service';
import { PompeService } from 'src/app/general/services/pompe.service';

@Component({
  selector: 'app-pistolet-list',
  templateUrl: './pistolet-list.component.html',
  styleUrls: ['./pistolet-list.component.scss']
})
export class PistoletListComponent implements OnInit {

  constructor(
    private service: PistoletService,
    private cuveService: CuveService,
    private pompeService: PompeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['referencePi', 'cuvRef', 'pompeRef', 'indexI', 'indexF', 'indexR', 'montantPi', 'montantPi', 'datePi','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.service.getPistolets().subscribe(
      list => {
        let array = list.map(item => {
          let cuvRef = this.cuveService.getCuveRef(item.payload.val()['referenceC']);
          let pompeRef = this.pompeService.getPompeRef(item.payload.val()['reference']);
          return {
            $key: item.key,
            cuvRef,
            pompeRef,
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
    this.dialog.open(PistoletComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
    this.dialog.open(PistoletComponent, dialogConfig);
  }

  onDelete($key){
    /*if(confirm('Êtes-vous sûr de supprimer cet enregistrement?')){
      this.service.deleteCompagnie($key);
      this.notificationService.warn('! Supprimer avec succes');
    }*/

    this.dialogService.openConfirmDialog('Êtes-vous sûr de supprimer cet enregistrement?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.service.deletePistolet($key);
        this.notificationService.warn('! Supprimer avec succes');
      }
    });
    
  }

}
