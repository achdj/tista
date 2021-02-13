import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//import { DatePipe } from '@angular/common';

import { keys } from 'lodash-es';
import * as _ from 'lodash-es';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) { }

  compagnieList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    directeur: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    numero: new FormControl('', [Validators.required, Validators.minLength(8)]),
    localisation: new FormControl(),
    abnDate: new FormControl(''),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nom: '',
      directeur: '',
      adresse: '',
      email: '',
      numero: '',
      localisation: '',
      abnDate: '',
      isActivate: false
    });
  }


  getCompagnies() {
    this.compagnieList = this.firebase.list("compagnies");
    return this.compagnieList.snapshotChanges();
  }

  
  insertCompagnie(compagnie) {
    this.compagnieList.push({
      nom: compagnie.nom,
      directeur: compagnie.directeur,
      adresse: compagnie.adresse,
      email: compagnie.email,
      numero: compagnie.numero,
      localisation: compagnie.localisation,
      abnDate: compagnie.abnDate == "" ? "" : this.datePipe.transform(compagnie.abnDate, 'yyyy-MM-dd'),
      isActivate: compagnie.isActivate
    });
  }

  updateCompagnie(compagnie) {
    this.compagnieList.update(compagnie.$key,
      {
        nom: compagnie.nom,
        directeur: compagnie.directeur,
        adresse: compagnie.adresse,
        email: compagnie.email,
        numero: compagnie.numero,
        localisation: compagnie.localisation,
        abnDate: compagnie.abnDate == "" ? "" : this.datePipe.transform(compagnie.abnDate, 'yyyy-MM-dd'),
        isActivate: compagnie.isActivate
      });
  }

  deleteCompagnie($key: string) {
    this.compagnieList.remove($key);
  }

  populateForm(compagnie){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(compagnie, ''));
  }

  getCompagnieNom($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }
  
}
