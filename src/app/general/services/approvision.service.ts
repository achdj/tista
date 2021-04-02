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
export class ApprovisionService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.approvisionList = this.firebase.list("approvisions");
    this.approvisionList.snapshotChanges().subscribe(
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

  approvisionList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    referenceApp: new FormControl('', Validators.required),
    cuves: new FormControl(0, Validators.required),
    quantiteApp: new FormControl('', Validators.required),
    coutTr: new FormControl('', Validators.required),
    prixAchat: new FormControl('', Validators.required),
    prixRevien: new FormControl(''),
    dateApp: new FormControl('', Validators.required)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      referenceApp: '',
      cuves: 0,
      quantiteApp: '',
      coutTr: '',
      prixAchat: '',
      prixRevien: '',
      dateApp: ''
    });
  }


  getApprovisions() {
    this.approvisionList = this.firebase.list("approvisions");
    return this.approvisionList.snapshotChanges();
  }

  
  insertApprovision(approvision) {
    this.approvisionList.push({
      referenceApp: approvision.referenceApp,
      cuves: approvision.cuves,
      quantiteApp: approvision.quantiteApp,
      coutTr: approvision.coutTr,
      prixAchat: approvision.prixAchat,
      prixRevien: approvision.prixRevien,
      dateApp: approvision.dateApp == "" ? "" : this.datePipe.transform(approvision.dateApp, 'yyyy-MM-dd')
    });
  }

  updateApprovision(approvision) {
    this.approvisionList.update(approvision.$key,
      {
        referenceApp: approvision.referenceApp,
        cuves: approvision.cuves,
        quantiteApp: approvision.quantiteApp,
        coutTr: approvision.coutTr,
        prixAchat: approvision.prixAchat,
        prixRevien: approvision.prixRevien,
        dateApp: approvision.dateApp == "" ? "" : this.datePipe.transform(approvision.dateApp, 'yyyy-MM-dd')
      });
  }

  deleteApprovision($key: string) {
    this.approvisionList.remove($key);
  }

  populateForm(approvision){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(approvision, 'cuveRef'));
  }

  getApprovisionRef($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['referenceApp'];
    }
  }
  
}
