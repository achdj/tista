import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApexOptions } from 'apexcharts';
import { ApexAnnotations, ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
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

  series: ApexAxisChartSeries; 
  chart: ApexChart;
  title: ApexTitleSubtitle;

  series2: ApexAxisChartSeries; 
  chart2: ApexChart;
  title2: ApexTitleSubtitle;

  series4: ApexAxisChartSeries; 
  chart4: ApexChart;
  title4: ApexTitleSubtitle;
  plotOptions4: ApexPlotOptions;
  xaxis4: ApexXAxis;
  yaxis4: ApexYAxis;
  dataLabels4: ApexDataLabels;

  series6: ApexAxisChartSeries; 
  chart6: ApexChart;
  title6: ApexTitleSubtitle;
  plotOptions6: ApexPlotOptions;
  xaxis6: ApexXAxis;
  dataLabels6: ApexDataLabels;

  constructor( ) { }

  ngOnInit(): void {
    this.initializeChartOptions();  
    this.initializeChartOptions2(); 
    this.initializeChartOptions4(); 
    this.initializeChartOptions6();  
  }


  //pour le premier
  lineChartData = [

    { data: [28, 48, 50, 70, 40, 20, 30], label: 'Produit' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Boutique' }
  
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

  //pour le second
  private initializeChartOptions(): void{
    this.title = {
      text: 'vente par pompe'
    };

    this.series = [{
      name: 'java',
      data: [12, 10, 19]
    }];

    this.chart = {
      type: 'bar',
      width: 210,
      height: 200,
      zoom: {
        enabled: false
      }
    };
  }

  // pour le troisième
  private initializeChartOptions2(): void{
    this.title2 = {
      text: 'vente par pistolet'
    };

    this.series2 = [{
      name: 'TEAM C',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }];

    this.chart2 = {
      type: 'line',
      width: 210,
      height: 200,
      stacked: false,
      zoom: {
        enabled: false
      }
    };

  }

  //pour le quatrème
  private initializeChartOptions4(): void{
    this.title4 = {
      text: 'Gain'
    };

    this.series4 = [
      {
      name: 'Net Profit',
      data: [31, 40, 28, 51, 42, 109, 100]
      }
    ];

    this.chart4 = {
      type: 'area',
      //width: 350,
      //height: 300
      stacked: false,
      zoom: {
        enabled: false
      }
    };

    this.xaxis4 = {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    };

    this.yaxis4 = {
      show: false,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }

    };

    this.dataLabels4 = {
      enabled: false
    };

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

  //pour le dernier
  private initializeChartOptions6(): void{
    this.title6 = {
      text: 'Analyse'
    };

    this.series6 = [
      {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, 
      {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
    ];

    this.chart6 = {
      type: 'bar',
      //width: 350,
      //height: 300
    };

    this.dataLabels6 = {
      enabled: false
    },

    this.xaxis6 = {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    };

  }

}
