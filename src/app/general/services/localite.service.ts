import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { keys } from 'lodash-es';
import * as _ from 'lodash';
//import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocaliteService {
  [x: string]: any;

  constructor(private firebase: AngularFireDatabase) {
    this.localiteList = this.firebase.list("localites");
    this.localiteList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          //let compagnieNom = this.compagnieService.getCompagnieNom(item.payload.val()['compagnies']);
          
          return {
            $key: item.key,
            //compagnieNom,
            ...item.payload.val()
          };
        });
      }
    );
  }

  localiteList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    compagnies: new FormControl(0, Validators.required),
    paysCompagnie: new FormControl(0,),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      nom: '',
      compagnies: 0,
      paysCompagnie: 0,
      isActivate: false
    });
  }


  getLocalites() {
    this.localiteList = this.firebase.list("localites");
    return this.localiteList.snapshotChanges();
  }

  
  insertLocalite(localite) {
    this.localiteList.push({
      nom: localite.nom,
      compagnies: localite.compagnies,
      paysCompagnie: localite.paysCompagnie,
      isActivate: localite.isActivate
    });
  }

  updateLocalite(localite) {
    this.localiteList.update(localite.$key,
      {
        nom: localite.nom,
        compagnies: localite.compagnies,
        paysCompagnie: localite.paysCompagnie,
        isActivate: localite.isActivate
      });
  }

  deleteLocalite($key: string) {
    this.localiteList.remove($key);
  }

  populateForm(localite){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(localite, 'compagnieNom'/*, 'compagniePays'*/));
  }

  getLocaliteNom($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }
}
