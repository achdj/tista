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
export class TrajetService {

  constructor(private firebase: AngularFireDatabase) {
    this.trajetList = this.firebase.list("trajets");
    this.trajetList.snapshotChanges().subscribe(
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

  trajetList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    compagnies: new FormControl(0, Validators.required),
    stationsD: new FormControl(0, Validators.required),
    stationsA: new FormControl(0, Validators.required),
    coutTrajet: new FormControl('', Validators.required),
    distance:new FormControl('', Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nom: '',
      compagnies: 0,
      stationsD: 0,
      stationsA: 0,
      coutTrajet: '',
      distance: '',
      isActivate: false
    });
  }


  getTrajets() {
    this.trajetList = this.firebase.list("trajets");
    return this.trajetList.snapshotChanges();
  }

  
  insertTrajet(trajet) {
    this.trajetList.push({
      nom: trajet.nom,
      compagnies: trajet.compagnies,
      stationsD: trajet.stationsD,
      stationsA: trajet.stationsA,
      coutTrajet: trajet.coutTrajet,
      distance: trajet.distance,
      isActivate: trajet.isActivate
    });
  }

  updateTrajet(trajet) {
    this.trajetList.update(trajet.$key,
      {
        nom: trajet.nom,
        compagnies: trajet.compagnies,
        stationsD: trajet.stationsD,
        stationsA: trajet.stationsA,
        coutTrajet: trajet.coutTrajet,
        distance: trajet.distance,
        isActivate: trajet.isActivate
      });
  }

  deleteTrajet($key: string) {
    this.trajetList.remove($key);
  }

  populateForm(trajet){
    //this.form.setValue(_.omit(trajet, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(trajet, 'compagnieNom', 'stationDepart', 'stationArrive'));
  }

  getTrajetNom($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }
}
