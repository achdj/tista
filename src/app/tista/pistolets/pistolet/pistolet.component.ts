import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';
import { PistoletService } from '../../../general/services/pistolet.service';
import { NotificationService } from '../../../general/services/notification.service';
import { CuveService } from '../../../general/services/cuve.service';
import { PompeService } from '../../../general/services/pompe.service';

@Component({
  selector: 'app-pistolet',
  templateUrl: './pistolet.component.html',
  styleUrls: ['./pistolet.component.scss']
})
export class PistoletComponent implements OnInit {

  indf = 0;
  mtne = 0;

  constructor(
    public service: PistoletService,
    public cuveService: CuveService,
    public pompeService: PompeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PistoletComponent>
    ) { }

  ngOnInit(): void {
    this.service.getPistolets();
    this.indf = this.indf;
    this.mtne = this.mtne;
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      
      if (!this.service.form.get('$key').value){
        this.service.insertPistolet(this.service.form.value);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updatePistolet(this.service.form.value);
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

  @ViewChild('indexinitial') indexinitial:ElementRef;
  @ViewChild('indexfinal') indexfinal:ElementRef;
  @ViewChild('indexrestant') indexrestant:ElementRef;
  @ViewChild('prixunitaire') prixunitaire:ElementRef;  
  onKey(){
    const ini = this.indexinitial.nativeElement.value;
    const inf = this.indexfinal.nativeElement.value; 
    const inr = this.indexrestant.nativeElement.value;
    const pu = this.prixunitaire.nativeElement.value;
    const r = parseInt(ini) - parseInt(inf) ;
    const mtn = r * pu;
    this.indf = r;
    this.mtne = mtn;
  }

}
