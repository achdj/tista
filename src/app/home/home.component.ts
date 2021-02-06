import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urlName = 'compagnie';
  constructor(
    public router: Router,
    //private route: ActivatedRoute,
  ) { 
    //super(router, toasterService);
  }

  ngOnInit(): void {
  }

  reserverPage() {
    this.router.navigate([this.urlName + '/add']);
  }
}
