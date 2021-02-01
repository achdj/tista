import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


export interface PeriodicElement {
  nom: string;
  position: number;
  directeur: string;
  adresse: string;
  email: string;
  numero: string;
  edit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nom: 'Abalo', directeur: 'Luc', adresse: 'Lomé,TOGO', email: 'Luc@gmail.com' , numero: '90 90 90 90', edit: ''},
  {position: 2, nom: 'Koffi', directeur: 'Afi', adresse: 'Aneho,TOGO', email: 'Afi@gmail.com' , numero: '90 90 90 50', edit: ''},
  {position: 3, nom: 'Jean', directeur: 'Steve', adresse: 'Atakpame,TOGO', email: 'Steve@gmail.com' , numero: '90 90 90 40', edit: ''},
  {position: 4, nom: 'Daril', directeur: 'Albert', adresse: 'Paris,FRANCE', email: 'Albert@gmail.com' , numero: '90 90 30 90', edit: ''},
  {position: 5, nom: 'Marck', directeur: 'Eric', adresse: 'Nice,FRANCE', email: 'Eric@gmail.com' , numero: '90 90 10 90', edit: ''},
  {position: 6, nom: 'Gilles', directeur: 'vitae', adresse: 'Tsévié,TOGO', email: 'vitae@gmail.com' , numero: '90 12 90 90', edit: ''},
  {position: 7, nom: 'Fred', directeur: 'kev', adresse: 'New York,USA', email: 'kev@gmail.com' , numero: '90 90 22 90', edit: ''},
  {position: 8, nom: 'Kokou', directeur: 'lebrone', adresse: 'Montréal,CANADA', email: 'lebrone@gmail.com' , numero: '93 90 90 90', edit: ''},
  {position: 9, nom: 'Claire', directeur: 'james', adresse: 'Kpalimé,TOGO', email: 'james@gmail.com' , numero: '90 05 90 90', edit: ''},
  {position: 10, nom: 'Naomie', directeur: 'chil', adresse: 'Wuhan,CHINE', email: 'chil@gmail.com' , numero: '90 90 90 10', edit: ''},
];

/**
 * @title Basic use of `<table mat-table>`
 */
export interface User {
  nom: string;
}

@Component({
  selector: 'app-compagnie',
  templateUrl: './compagnie.component.html',
  styleUrls: ['./compagnie.component.scss']
})
export class CompagnieComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nom', 'directeur', 'adresse', 'email', 'numero', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  myControl = new FormControl();
  options: User[] =ELEMENT_DATA;
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nom),
        map(nom => nom ? this._filter(nom) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.nom ? user.nom : '';
  }

  private _filter(nom: string): User[] {
    const filterValue = nom.toLowerCase();

    return this.options.filter(option => option.nom.toLowerCase().indexOf(filterValue) === 0);
  }
}
