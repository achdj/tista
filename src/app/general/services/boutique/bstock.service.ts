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
export class BstockService {

  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.bstockList = this.firebase.list("bstocks");
    this.bstockList.snapshotChanges().subscribe(
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

  bstockList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    description: new FormControl('', Validators.required),
    priceU: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      description: '',
      priceU: '',
      quantity: ''
    });
  }


  getBstocks() {
    this.bstockList = this.firebase.list("bstocks");
    return this.bstockList.snapshotChanges();
  }

  
  insertBstock(bstock) {
    this.bstockList.push({
      description: bstock.description,
      priceU: bstock.priceU,
      quantity: bstock.quantity
    });
  }

  updateBstock(bstock) {
    this.bstockList.update(bstock.$key,
      {
        description: bstock.description,
        priceU: bstock.priceU,
        quantity: bstock.quantity
      });
  }

  deleteBstock($key: string) {
    this.bstockList.remove($key);
  }

  populateForm(bstock){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(bstock, ''));
  }

  getBstockdescription($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['description'];
    }
  }
  
}
