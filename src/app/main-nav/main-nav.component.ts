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
  urlNameP = 'programmations';
  urlName = 'compagnies';
  urlNameS = 'stations';
  urlNameT = 'trajets';
  urlNameB = 'bus';
  urlNameR = 'reservations';
  urlNameC = 'contacts';

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

  //route pour les programmation de bus
  listPageP(){
    this.router.navigate([this.urlNameP]);
  }

  //route pour les compagnies
  listPageC() {
    this.router.navigate([this.urlName]);
  }

  //route pour les stations
  listPageS() {
    this.router.navigate([this.urlNameS]);
  }

  //route pour les trajets
  listPageT() {
    this.router.navigate([this.urlNameT]);
  }

  //route pour les bus
  listPageB() {
    this.router.navigate([this.urlNameB]);
  }

  //route pour les reservations
  listPageR() {
    this.router.navigate([this.urlNameR]);
  }
  
  //route pour le contact
  contactPage(){
    this.router.navigate([this.urlNameC]);
  }
}
