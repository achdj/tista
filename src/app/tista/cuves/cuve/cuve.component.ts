import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';
import { CuveService } from '../../../general/services/cuve.service';
import { NotificationService } from '../../../general/services/notification.service';

@Component({
  selector: 'app-cuve',
  templateUrl: './cuve.component.html',
  styleUrls: ['./cuve.component.scss']
})
export class CuveComponent implements OnInit {

  //cq = 0;
  //cpt = 0;
  constructor(
    public service: CuveService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CuveComponent>
    ) { }

  ngOnInit(): void {
    this.service.getCuves();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertCuve(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateCuve(this.service.form.value);
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

  /*@ViewChild('fondovalor') fondovalor:ElementRef;
  @ViewChild('box') box:ElementRef;
  onKey(){
    const mr = this.box.nativeElement.value; 
    console.log('volume', mr);
    const valueInput = this.fondovalor.nativeElement.value;
    console.log('prix', valueInput);
    const r = (mr * valueInput);
    this.cq = r;
  }*/

}
