import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';
import { ApprovisionService } from '../../../general/services/approvision.service';
import { NotificationService } from '../../../general/services/notification.service';
import { CuveService } from '../../../general/services/cuve.service';

@Component({
  selector: 'app-approvision',
  templateUrl: './approvision.component.html',
  styleUrls: ['./approvision.component.scss']
})
export class ApprovisionComponent implements OnInit {

  pr = 0;
  //cpt = 0;

  constructor(
    public service: ApprovisionService,
    public cuveService: CuveService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ApprovisionComponent>
    ) { }

  ngOnInit(): void {
    this.service.getApprovisions();
    this.pr = this.pr;
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      
      if (!this.service.form.get('$key').value){
        this.service.insertApprovision(this.service.form.value);
        const cu = this.service.form.get('cuves').value;
        const qajc = this.service.form.get('quantiteApp').value;
        //console.log('idCuve', cu);
        //console.log('quantiteApp', qac);
        this.cuveService.updateQuantiteCuve(cu, qajc);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateApprovision(this.service.form.value);
        const cu = this.service.form.get('cuves').value;
        const qajc = this.service.form.get('quantiteApp').value;
        //console.log('idCuve', cu);
        //console.log('quantiteApp', qac);
        this.cuveService.updateQuantiteCuve(cu, qajc);
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

  @ViewChild('fondovalor') fondovalor:ElementRef;
  @ViewChild('box') box:ElementRef;
  onKey(){
    const mr = this.box.nativeElement.value; 
    console.log('PA/L', mr);
    const valueInput = this.fondovalor.nativeElement.value;
    console.log('PT/L', valueInput);
    const r = parseInt(valueInput) + parseInt(mr) ;
    this.pr = r;
  }

}
