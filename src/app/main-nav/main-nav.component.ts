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
  urlNameB = 'bons';
  urlNameP = 'pompes';
  urlNameS = 'stocks';
  urlNameCl = 'clients';
  urlNameV= 'ventes';
  urlNameD = 'depenses';
  urlNameCo = 'compensations';

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

  //route pour les pompes
  listPageP() {
    this.router.navigate([this.urlNameP]);
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

  //route pour les déoenses
  listPageD() {
    this.router.navigate([this.urlNameD]);
  }
  
  //route pour les compensations
  listPageCo(){
    this.router.navigate([this.urlNameCo]);
  }
}
