import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
//import { ToasterService } from 'angular2-toaster';
/*export var lineChartLegend = true;
export var lineChartType = 'line';*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  constructor( ) { }

  ngOnInit(): void {
  
  }


  //pour le premier
  lineChartData = [

    { data: [28, 48, 50, 70, 40, 20, 30], label: 'Series A' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series B' }
  
  ];
  
  lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  lineChartOptions = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false
  };
  
  lineChartColors = [
  
    {
  
    backgroundColor: 'rgba(255, 141, 96, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
  
    backgroundColor: 'rgba(0, 157, 160, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  
  ];
  lineChartLegend = true;
  lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  //pour le rond
  chartOptions = {
    responsive: false
  };

  chartDatasets = [
    { data: [1,2,3,4,5]}
  ];

  chartLabels = ["Station1", "Station2", "Station3", "Station4", "Station5"];

  lChartType = 'doughnut';

}
