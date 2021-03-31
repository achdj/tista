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
export class DepenseService {
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.depenseList = this.firebase.list("depenses");
    this.depenseList.snapshotChanges().subscribe(
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

  depenseList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    description: new FormControl('', Validators.required),
    AmountExp: new FormControl('', Validators.required),
    doAt: new FormControl('')
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      description: '',
      AmountExp: '',
      doAt: ''
    });
  }


  getDepenses() {
    this.depenseList = this.firebase.list("depenses");
    return this.depenseList.snapshotChanges();
  }

  
  insertDepense(depense) {
    this.depenseList.push({
      description: depense.description,
      AmountExp:  depense.AmountExp,
      doAt:  depense.doAt == "" ? "" : this.datePipe.transform(depense.doAt, 'yyyy-MM-dd')
    });
  }

  updateDepense(depense) {
    this.depenseList.update(depense.$key,
      {
        description: depense.description,
        AmountExp: depense.AmountExp,
        doAt:  depense.doAt == "" ? "" : this.datePipe.transform(depense.doAt, 'yyyy-MM-dd')
      });
  }

  deleteDepense($key: string) {
    this.depenseList.remove($key);
  }

  populateForm(depense){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(depense, ''));
  }

  getDepensedescription($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['description'];
    }
  }
  
}
