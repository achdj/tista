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
export class StockService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.stockList = this.firebase.list("stocks");
    this.stockList.snapshotChanges().subscribe(
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

  stockList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    description: new FormControl('', Validators.required),
    prixU: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      description: '',
      prixU: '',
      quantite: '',
      isActivate: false
    });
  }


  getPompes() {
    this.stockList = this.firebase.list("pompes");
    return this.stockList.snapshotChanges();
  }

  
  insertPompe(pompe) {
    this.stockList.push({
      description: pompe.description,
      prixU: pompe.prixU,
      quantite: pompe.quantite,
      isActivate: pompe.isActivate
    });
  }

  updatePompe(pompe) {
    this.stockList.update(pompe.$key,
      {
        description: pompe.description,
        prixU: pompe.prixU,
        quantite: pompe.quantite,
        isActivate: pompe.isActivate
      });
  }

  deletePompe($key: string) {
    this.stockList.remove($key);
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
