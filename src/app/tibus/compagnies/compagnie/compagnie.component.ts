import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { CompagnieService } from '../../../general/services/compagnie.service';
import { NotificationService } from '../../../general/services/notification.service';

@Component({
  selector: 'app-compagnie',
  templateUrl: './compagnie.component.html',
  styleUrls: ['./compagnie.component.scss']
})
export class CompagnieComponent implements OnInit {

  constructor(
    public service: CompagnieService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CompagnieComponent>
    ) { }

  ngOnInit(): void {
    this.service.getCompagnies();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertCompagnie(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateCompagnie(this.service.form.value);
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
