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
export class ClientService {

  
  constructor(private firebase: AngularFireDatabase , private datePipe: DatePipe) {
    this.clientList = this.firebase.list("clients");
    this.clientList.snapshotChanges().subscribe(
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

  clientList: AngularFireList<any>;
  array = [];

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', Validators.email),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    menberSince: new FormControl(''),
    adresse: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    dob: new FormControl('',),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(8)]),
    //qrCode: new FormControl('', Validators.required),
    //photo: new FormControl('', Validators.required),
    isActivate: new FormControl(false)
  });
  
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      email: '',
      nom: '',
      prenom: '',
      menberSince: '',
      adresse: '',
      sex: '',
      dob: '',
      phoneNumber: '',
      //qrCode: '',
      //photo: '',
      isActivate: false
    });
  }


  getClients() {
    this.clientList = this.firebase.list("clients");
    return this.clientList.snapshotChanges();
  }

  
  insertClient(client) {
    this.clientList.push({
      email: client.email,
      nom: client.nom,
      prenom: client.prenom,
      menberSince: client.menberSince == "" ? "" : this.datePipe.transform(client.menberSince, 'yyyy-MM-dd'),
      adresse: client.adresse,
      sex: client.sex,
      dob: client.dob == "" ? "" : this.datePipe.transform(client.dob, 'yyyy-MM-dd'),
      phoneNumber: client.phoneNumber,
      //qrCode: client.qrCode,
      //photo: client.photo,
      isActivate: client.isActivate
    });
  }

  updateClient(client) {
    this.clientList.update(client.$key,
      {
        email: client.email,
        nom: client.nom,
        prenom: client.prenom,
        menberSince: client.menberSince == "" ? "" : this.datePipe.transform(client.menberSince, 'yyyy-MM-dd'),
        adresse: client.adresse,
        sex: client.sex,
        dob: client.dob == "" ? "" : this.datePipe.transform(client.dob, 'yyyy-MM-dd'),
        phoneNumber: client.phoneNumber,
        //qrCode: client.qrCode,
        //photo: client.photo,
        isActivate: client.isActivate
      });
  }

  deleteClient($key: string) {
    this.clientList.remove($key);
  }

  populateForm(client){
    //this.form.setValue(_.omit(compagnie, 'busNom')); si on recupère avec une info d'autre service
    this.form.setValue(_.omit(client, ''));
  }

  getClientNom($key) {
    if ($key == "0")
      return "";
    else{
      return _ .find(this.array, (obj) => { return obj.$key == $key; })['nom'];
    }
  }
  
}
