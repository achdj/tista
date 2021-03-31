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
    priceU: new FormControl('', Validators.required),
    Qte: new FormControl('', Validators.required),
    remise: new FormControl('', Validators.required),
    perte: new FormControl('',Validators.required)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      priceU: '',
      Qte: '',
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
      priceU: vente.priceU,
      Qte: vente.Qte,
      remise: vente.remise,
      perte: vente.perte 
    });
  }

  updateVente(vente) {
    this.venteList.update(vente.$key,
      {
        priceU: vente.priceU,
        Qte: vente.Qte,
        remise: vente.remise,
        perte: vente.perte 
      });
  }

  deleteVente($key: string) {
    this.venteList.remove($key);
  }

  populateForm(vente){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(vente, ''));
  }

  getVentepriceU($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['priceU'];
    }
  }
  
}
