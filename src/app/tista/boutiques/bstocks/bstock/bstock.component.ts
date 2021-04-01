import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BstockService } from 'src/app/general//services/boutique/bstock.service';
import { NotificationService } from 'src/app/general//services/notification.service';
import {MatDatepickerModule} from '@angular/material/datepicker'; 

@Component({
  selector: 'app-bstock',
  templateUrl: './bstock.component.html',
  styleUrls: ['./bstock.component.scss']
})
export class BstockComponent implements OnInit {

  constructor(
    public service: BstockService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<BstockComponent>
  ) { }

  ngOnInit(): void {
    this.service.getBstocks();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertBstock(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateBstock(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Modifier avec succes');
        this.onClose();
      }
      
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
