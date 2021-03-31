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


  getStocks() {
    this.stockList = this.firebase.list("stocks");
    return this.stockList.snapshotChanges();
  }

  
  insertStock(stock) {
    this.stockList.push({
      description: stock.description,
      prixU: stock.prixU,
      quantite: stock.quantite,
      isActivate: stock.isActivate
    });
  }

  updateStock(stock) {
    this.stockList.update(stock.$key,
      {
        description: stock.description,
        prixU: stock.prixU,
        quantite: stock.quantite,
        isActivate: stock.isActivate
      });
  }

  deleteStock($key: string) {
    this.stockList.remove($key);
  }

  populateForm(stock){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(stock, ''));
  }

  getDescStock($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['description'];
    }
  }
  
}
