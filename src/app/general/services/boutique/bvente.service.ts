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

export class BventeService {
  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.bventeList = this.firebase.list("bventes");
    this.bventeList.snapshotChanges().subscribe(
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

  bventeList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    priceU: new FormControl('', Validators.required),
    Qte: new FormControl('', Validators.required),
    remise: new FormControl(''),
    perte: new FormControl('')
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      priceU: '',
      Qte: '',
      remise: '',
      perte:''
    });
  }


  getBventes() {
    this.bventeList = this.firebase.list("bventes");
    return this.bventeList.snapshotChanges();
  }

  
  insertBvente(bvente) {
    this.bventeList.push({
      priceU: bvente.priceU,
      Qte:  bvente.Qte,
      remise:  bvente.remise,
      perte:  bvente.perte
    });
  }

  updateBvente(bvente) {
    this.bventeList.update(bvente.$key,
      {
        priceU: bvente.priceU,
        Qte: bvente.Qte,
        remise: bvente.remise,
        perte: bvente.perte
      });
  }

  deleteBvente($key: string) {
    this.bventeList.remove($key);
  }

  populateForm(bvente){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(bvente, ''));
  }

  getBventepriceU($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['priceU'];
    }
  }
  
}
