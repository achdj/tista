import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  urlNameH = '/';
  urlNameU = 'users';
  urlNameC = 'cartes';
  urlNameApp = 'approvisions';
  urlNameB = 'bons';
  urlNameCuv = 'cuves';
  urlNameP = 'pompes';
  urlNamePi = 'pistolets'
  urlNameS = 'stocks';
  urlNameCl = 'clients';
  urlNameV= 'ventes';
  urlNameD = 'depenses';
  urlNameCo = 'compensations';

  urlNameBstat = 'bstatistiques';
  urlNameBsto= 'bstocks';
  urlNameBvente = 'bventes';
  urlNameBfact = 'bfactures';

  urlNameF = 'foutnisseurs';
  urlNameSt = 'statisqtiques';
  urlNameSta = 'stations';
  urlNameT = 'transports';
  urlNameM = 'messages';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public router: Router,) {}

  ngOnInit(): void{

  }

  //route du tableau de bord
  homePage() {
    this.router.navigate([this.urlNameH]);
  }

  //route pour les utilisateurs
  listPageU() {
    this.router.navigate([this.urlNameU]);
  }

  //route pour les cartes
  listPageC(){
    this.router.navigate([this.urlNameC]);
  }

  //route pour les bons d'essences
  listPageB() {
    this.router.navigate([this.urlNameB]);
  }

  //route pour les approvisionnement
  listPageApp() {
    this.router.navigate([this.urlNameApp]);
  }
  
  //route pour les cuves
  listPageCuv() {
    this.router.navigate([this.urlNameCuv]);
  }

  //route pour les pompes
  listPageP() {
    this.router.navigate([this.urlNameP]);
  }

  //route pour les pistolet
  listPagePi() {
    this.router.navigate([this.urlNamePi]);
  }

  //route pour les stocks
  listPageS() {
    this.router.navigate([this.urlNameS]);
  }

  //route pour les clients
  listPageCl() {
    this.router.navigate([this.urlNameCl]);
  }

  //route pour les ventes
  listPageV() {
    this.router.navigate([this.urlNameV]);
  }

  //route pour les dépenses
  listPageD() {
    this.router.navigate([this.urlNameD]);
  }
  
  //route pour les compensations
  listPageCo(){
    this.router.navigate([this.urlNameCo]);
  }

  //route pour la boutique
    //stat de la boutique
    listPageBstat(){
      this.router.navigate([this.urlNameBstat]);
    }
    //stock de la boutique
    listPageBsto(){
      this.router.navigate([this.urlNameBsto]);
    }
    //vente de la boutique
    listPageBvente(){
      this.router.navigate([this.urlNameBvente]);
    }
    //facture de la boutique
    listPageBfact(){
      this.router.navigate([this.urlNameBfact]);
    }

  //route pour les fournisseurs
  listPageF(){
    this.router.navigate([this.urlNameF]);
  }

  //route pour les statistiques
  listPageSt(){
    this.router.navigate([this.urlNameSt]);
  }

  //route pour les stations
  listPageSta(){
    this.router.navigate([this.urlNameSta]);
  }

  //route pour les transports
  listPageT(){
    this.router.navigate([this.urlNameT]);
  }

  //route pour les messages
  listPageM(){
    this.router.navigate([this.urlNameM]);
  }
}
