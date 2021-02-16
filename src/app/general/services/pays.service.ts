import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { __assign } from 'tslib';

import { keys } from 'lodash-es';
//import * as _ from 'lodash-es';
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  paysList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.paysList = this.firebase.list("pays");
    this.paysList.snapshotChanges().subscribe(
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

  getPaysNom($key) {
    if ($key == "0")
      return "";
    else{
      return _.find(this.array, (obj) => { return obj.$key == $key; })['nomPays'];
    }
  }

}
