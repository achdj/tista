import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { BventeService } from '../../../../general/services/boutique/bvente.service';
import { NotificationService } from '../../../../general/services/notification.service';

@Component({
  selector: 'app-bvente',
  templateUrl: './bvente.component.html',
  styleUrls: ['./bvente.component.scss']
})
export class BventeComponent implements OnInit {
  constructor(
    public service: BventeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<BventeComponent>
  ) { }

  ngOnInit(): void {
    this.service.getBventes();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertBvente(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateBvente(this.service.form.value);
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

