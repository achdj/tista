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
export class PompeService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.pompeList = this.firebase.list("pompes");
    this.pompeList.snapshotChanges().subscribe(
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

  pompeList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    reference: new FormControl('', Validators.required),
    produit: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      reference: '',
      produit: '',
      quantite: '',
      isActivate: false
    });
  }


  getPompes() {
    this.pompeList = this.firebase.list("pompes");
    return this.pompeList.snapshotChanges();
  }

  
  insertPompe(pompe) {
    this.pompeList.push({
      reference: pompe.reference,
      produit: pompe.produit,
      quantite: pompe.quantite,
      isActivate: pompe.isActivate
    });
  }

  updatePompe(pompe) {
    this.pompeList.update(pompe.$key,
      {
        reference: pompe.reference,
        produit: pompe.produit,
        quantite: pompe.quantite,
        isActivate: pompe.isActivate
      });
  }

  deletePompe($key: string) {
    this.pompeList.remove($key);
  }

  populateForm(pompe){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(pompe, ''));
  }

  getPompeRef($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['reference'];
    }
  }
  
}
