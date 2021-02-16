import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocaliteService } from '../../../general/services/localite.service';
import { CompagnieService } from '../../../general/services/compagnie.service';
import { NotificationService } from '../../../general/services/notification.service';
import { PaysService } from '../../../general/services/pays.service';

@Component({
  selector: 'app-localite',
  templateUrl: './localite.component.html',
  styleUrls: ['./localite.component.scss']
})
export class LocaliteComponent implements OnInit {
  nomPays: any;

  constructor(
    public service: LocaliteService,
    public compagnieService: CompagnieService,
    public paysService: PaysService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<LocaliteComponent>
  ) { }


  ngOnInit(): void {
    this.service.getLocalites();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertLocalite(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateLocalite(this.service.form.value);
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

  getCompagniePays(event) {

    const c = event.value;
    const cp = this.compagnieService.getCompagniePaysNom(c);
    //this.paysService.getPaysNom(cp);
    const cpn = this.paysService.getPaysNom(cp);
    //console.log('cle', cpn);  
    this.nomPays = cpn;
    /*this.service.form.get('paysCompagnie').setValue(cpn);*/
  }

  

}
