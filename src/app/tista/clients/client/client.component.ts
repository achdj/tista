import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'; 

import { ClientService } from '../../../general/services/client.service';
import { NotificationService } from '../../../general/services/notification.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    public service: ClientService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClientComponent>
  ) { }

  sexs = [
    {Id:1, name:'Masculin'},
    {Id:2, name:'Féminin'}
  ];

  ngOnInit(): void {
    this.service.getClients();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertClient(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateClient(this.service.form.value);
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

