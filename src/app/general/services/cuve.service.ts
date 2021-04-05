import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as a from '@angular/fire';
import { keys } from 'lodash-es';
import * as _ from 'lodash-es';
//import _ from "lodash";
//import _ from "lodash/wrapperLodash";
import { DatePipe } from '@angular/common';
import { __assign } from 'tslib';
import { fingerprint } from '@angular/compiler/src/i18n/digest';

@Injectable({
  providedIn: 'root'
})
export class CuveService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.cuveList = this.firebase.list("cuves");
    this.cuveList.snapshotChanges().subscribe(
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

  cuveList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    referenceC: new FormControl('', Validators.required),
    produitC: new FormControl('', Validators.required),
    volumeC: new FormControl('', Validators.required),
    quantiteAjoute: new FormControl(''),
    quantiteActuel: new FormControl(''),
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      referenceC: '',
      produitC: '',
      volumeC: '',
      quantiteAjoute: 0,
      quantiteActuel: 0
    });
  }


  getCuves() {
    this.cuveList = this.firebase.list("cuves");
    return this.cuveList.snapshotChanges();
  }

  
  insertCuve(cuve) {
    this.cuveList.push({
      referenceC: cuve.referenceC,
      produitC: cuve.produitC,
      volumeC: cuve.volumeC,
      quantiteAjoute: cuve.quantiteAjoute,
      quantiteActuel: cuve.quantiteActuel
    });
  }

  updateCuve(cuve) {
    this.cuveList.update(cuve.$key,
      {
        referenceC: cuve.referenceC,
        produitC: cuve.produitC,
        volumeC: cuve.volumeC,
        quantiteAjoute: cuve.quantiteAjoute,
        quantiteActuel: cuve.quantiteActuel
      });
  }

  deleteCuve($key: string) {
    this.cuveList.remove($key);
  }

  populateForm(cuve){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(cuve, ''));
  }

  getCuveVolume($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['volumeC'];  
    }
  }

  getCuveQuantiteActuel($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['quantiteActuel'];  
    }
  }

  getCuveRef($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['referenceC'];  
    }
  }

  updateQuantiteCuve(cu, qajc) {
    if (cu == "0")
      return "";
    else{
      const qancien = _ .find(this.array, (obj) => { return obj.$key == cu; })['quantiteActuel'];
      this.cuveList.update(cu,
        {
          quantiteAjoute: qajc,
          quantiteActuel: (parseInt(qajc) + parseInt(qancien))
      });
    }
  }

  updateQuantiteCuveVente(cuv, qv) {
    if (cuv == "0")
      return "";
    else{
      const qancien = _ .find(this.array, (obj) => { return obj.$key == cuv; })['quantiteActuel'];
      this.cuveList.update(cuv,
        {
          quantiteActuel: (parseInt(qancien) - parseInt(qv))
      });
    }
  }
  
}
