import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PompeService } from '../../../general/services/pompe.service';
import { NotificationService } from '../../../general/services/notification.service';


@Component({
  selector: 'app-pompe',
  templateUrl: './pompe.component.html',
  styleUrls: ['./pompe.component.scss']
})
export class PompeComponent implements OnInit {

  constructor(
    public service: PompeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PompeComponent>
    ) { }

  ngOnInit(): void {
    this.service.getPompes();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertPompe(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updatePompe(this.service.form.value);
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
