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
export class PistoletService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.pistoletList = this.firebase.list("pistolets");
    this.pistoletList.snapshotChanges().subscribe(
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

  pistoletList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    referencePi: new FormControl('', Validators.required),
    indexI: new FormControl('', Validators.required),
    indexF: new FormControl('', Validators.required),
    indexR: new FormControl(''),
    montantPi: new FormControl('', Validators.required),
    prixUPi: new FormControl('', Validators.required),
    datePi: new FormControl('', Validators.required),
    cuves: new FormControl(0, Validators.required),
    pompes: new FormControl(0, Validators.required)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      referencePi: '',
      indexI: '',
      indexF: '',
      indexR: '',
      montantPi: '',
      prixUPi: '',
      datePi: '',
      cuves: 0,
      pompes: 0
    });
  }


  getPistolets() {
    this.pistoletList = this.firebase.list("pistolets");
    return this.pistoletList.snapshotChanges();
  }

  
  insertPistolet(pistolet) {
    this.pistoletList.push({
      referencePi: pistolet.referencePi,
      indexI: pistolet.indexI,
      indexF: pistolet.indexF,
      indexR: pistolet.indexR,
      montantPi: pistolet.montantPi,
      prixUPi: pistolet.prixUPi,
      datePi: pistolet.datePi == "" ? "" : this.datePipe.transform(pistolet.datePi, 'yyyy-MM-dd'),
      cuves: pistolet.cuves,
      pompes: pistolet.pompes
    });
  }

  updatePistolet(pistolet) {
    this.pistoletList.update(pistolet.$key,
      {
        referencePi: pistolet.referencePi,
        indexI: pistolet.indexI,
        indexF: pistolet.indexF,
        indexR: pistolet.indexR,
        montantPi: pistolet.montantPi,
        prixUPi: pistolet.prixUPi,
        datePi: pistolet.datePi == "" ? "" : this.datePipe.transform(pistolet.datePi, 'yyyy-MM-dd'),
        cuves: pistolet.cuves,
        pompes: pistolet.pompes
      });
  }

  deletePistolet($key: string) {
    this.pistoletList.remove($key);
  }

  populateForm(pistolet){
    //si on recupère avec une info d'autre service
    this.form.setValue(_.omit(pistolet, 'cuvRef', 'pompeRef'));
  }

  getPistoletRef($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['referencePi'];
    }
  }
  
}
