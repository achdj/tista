import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewChild, ElementRef } from '@angular/core';
import { VenteService } from '../../../general/services/vente.service';
import { NotificationService } from '../../../general/services/notification.service';
import { PistoletService } from '../../../general/services/pistolet.service';
import { PompeService } from '../../../general/services/pompe.service';
import { CuveService } from '../../../general/services/cuve.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {

  pompeNom = '';
  pistoletIA = 0;
  quant = 0;
  montantFinale = 0;

  constructor(
    public service: VenteService,
    public cuveService: CuveService,
    public pistoletService: PistoletService,
    public pompeService: PompeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<VenteComponent>
  ) { }

  ngOnInit(): void {
    this.service.getVentes();
    this.pompeNom = this.pompeNom;
    this.pistoletIA = this.pistoletIA;
    this.quant = this.quant;
    this.montantFinale = this.montantFinale;
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.failure(':: Effacer avec succes');
  }

  onSubmit(){
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value){
        this.service.insertVente(this.service.form.value);
        const pisto = this.service.form.get('pistolets').value;
        const cuv = this.pistoletService.getPistoletCuveRef(pisto);
        const qv = this.service.form.get('indexAV').value;
        this.cuveService.updateQuantiteCuveVente(cuv, qv);
        const qnp = this.service.form.get('indexFV').value;
        this.pistoletService.updateIndexPistoletActuel(pisto, qnp);
        this.notificationService.success(':: Enregistrer avec succes');
        this.onClose();
      }
      else{
        this.service.updateVente(this.service.form.value);
        const pisto = this.service.form.get('pistolets').value;
        const cuv = this.pistoletService.getPistoletCuveRef(pisto);
        const qv = this.service.form.get('indexAV').value;
        this.cuveService.updateQuantiteCuveVente(cuv, qv);
        const qnp = this.service.form.get('indexFV').value;
        this.pistoletService.updateIndexPistoletActuel(pisto, qnp);
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

  @ViewChild('indAV') indAV:ElementRef;
  @ViewChild('prixUnit') prixUnit:ElementRef;
  @ViewChild('perteV') perteV:ElementRef;
  onChange($event, tabValue){
    //console.log(tabValue);
    const pis = tabValue;
    const pomp = this.pistoletService.getPompeId(pis);
    const pistIA = this.pistoletService.getPistIActuel(pis);
    //console.log('pompe Id', pomp);
    const pompNom = this.pompeService.getPompeRef(pomp);
    //console.log('nom pompe', pompNom);
    this.pompeNom = pompNom;
    this.pistoletIA = pistIA;
    
    
    /*const pru = this.prixUnit.nativeElement.value;
    const qu = parseInt(iav) - parseInt(pistIA);
    this.q = qu;
    const mt = qt * qu;
    this.montantFinale = mt;*/
  }

  onKey(){
    const iav = this.indAV.nativeElement.value;
    const pv = this.perteV.nativeElement.value;
    const qt = parseInt(iav) - this.pistoletIA - parseInt(pv);
    this.quant = qt;
    const pru = this.prixUnit.nativeElement.value;
    const mtnF = this.quant * pru;
    this.montantFinale = mtnF;    
  }

}

