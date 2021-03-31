import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepenseService } from '../../../general/services/depense.service';
import { NotificationService } from '../../../general/services/notification.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit {

  constructor(
    public service: DepenseService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<DepenseComponent>
  ) { }

  ngOnInit(): void {
    this.service.getDepenses();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertDepense(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateDepense(this.service.form.value);
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

