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
export class VehiculeService {

  constructor(private firebase: AngularFireDatabase) {
    this.vehiculeList = this.firebase.list("vehicules");
    this.vehiculeList.snapshotChanges().subscribe(
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

  vehiculeList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    numImmat: new FormControl('', Validators.required),
    marque: new FormControl('', Validators.required),
    placeTotal: new FormControl('', Validators.required),
    placePassager: new FormControl('', Validators.required),
    compagnies: new FormControl(0, Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      numImmat: '',
      marque: '',
      placeTotal: '',
      placePassager: '',
      compagnies: 0,
      isActivate: false
    });
  }


  getVehicules() {
    this.vehiculeList = this.firebase.list("vehicules");
    return this.vehiculeList.snapshotChanges();
  }

  
  insertVehicule(vehicule) {
    this.vehiculeList.push({
      numImmat: vehicule.numImmat,
      marque: vehicule.marque,
      placeTotal: vehicule.placeTotal,
      placePassager: vehicule.placePassager,
      compagnies: vehicule.compagnies,
      isActivate: vehicule.isActivate
    });
  }

  updateVehicule(vehicule) {
    this.vehiculeList.update(vehicule.$key,
      {
        numImmat: vehicule.numImmat,
        marque: vehicule.marque,
        placeTotal: vehicule.placeTotal,
        placePassager: vehicule.placePassager,
        compagnies: vehicule.compagnies,
        isActivate: vehicule.isActivate
      });
  }

  deleteVehicule($key: string) {
    this.vehiculeList.remove($key);
  }

  populateForm(vehicule){
    //this.form.setValue(_.omit(vehicule, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(vehicule, 'compagnieNom'));
  }

  getVehiculeNom($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['numImmat']['marque'];
    }
  }
}
