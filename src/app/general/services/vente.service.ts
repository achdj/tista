import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { keys } from 'lodash-es';
import * as _ from 'lodash';
//import _ from "lodash";
import { DatePipe } from '@angular/common';
import { __assign } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class VenteService {
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.venteList = this.firebase.list("ventes");
    this.venteList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  venteList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    dateVente: new FormControl('', Validators.required),
    pistolets: new FormControl(0, Validators.required),
    pompes: new FormControl(0, Validators.required),
    indexIV: new FormControl('', Validators.required),
    indexFV: new FormControl('', Validators.required),
    indexAV: new FormControl('', Validators.required),
    priceUV: new FormControl('', Validators.required),
    montantV: new FormControl('', Validators.required),
    remise: new FormControl(''),
    perte: new FormControl('')
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      dateVente: '',
      pistolets: 0,
      pompes: '',
      indexIV: '',
      indexFV: '',
      indexAV: '',
      priceUV: '',
      montantV: '',
      remise: '',
      perte: ''
    });
  }


  getVentes() {
    this.venteList = this.firebase.list("ventes");
    return this.venteList.snapshotChanges();
  }

  
  insertVente(vente) {
    this.venteList.push({
      dateVente: vente.dateVente == "" ? "" : this.datePipe.transform(vente.dateVente, 'yyyy-MM-dd'),
      pistolets: vente.pistolets,
      pompes: vente.pompes,
      indexIV: vente.indexIV,
      indexFV: vente.indexFV,
      indexAV: vente.indexAV,
      priceUV: vente.priceUV,
      montantV: vente.montantV,
      remise: vente.remise,
      perte: vente.perte
    });
  }

  updateVente(vente) {
    this.venteList.update(vente.$key,
      {
        dateVente: vente.dateVente == "" ? "" : this.datePipe.transform(vente.dateVente, 'yyyy-MM-dd'),
        pistolets: vente.pistolets,
        pompes: vente.pompes,
        indexIV: vente.indexIV,
        indexFV: vente.indexFV,
        indexAV: vente.indexAV,
        priceUV: vente.priceUV,
        montantV: vente.montantV,
        remise: vente.remise,
        perte: vente.perte
      });
  }

  deleteVente($key: string) {
    this.venteList.remove($key);
  }

  populateForm(vente){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(vente, 'pistoletRef'));
  }

  getVentepriceU($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['priceU'];
    }
  }
  
}
