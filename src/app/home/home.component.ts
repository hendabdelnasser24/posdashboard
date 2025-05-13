import { Component, ViewChild } from '@angular/core';
import { ChartsComponent } from "../charts/charts.component";
import { ChartComponent } from "ng-apexcharts";
import { NgApexchartsModule, } from "ng-apexcharts";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartsComponent, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;
  public donutChartOptions: any;
  constructor() { }

  ngOnInit(): void {
    this.pieChart()
    this.donutCharts()

  }

  pieChart() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Lunch', 'Breakfast', 'Beverages', 'Dessert', 'Sandwiches'],
      colors: ['#A1A5B7', '#7E8299', '#D8D8E5', '#4C4F64', '#66A0B2'],
      title: {
        text: 'Top selling items',
        style: {
          padding: '40px'
        },
        align: 'left',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          legend: {
            position: 'bottom'

          }
        }
      }],
    }
  }

  donutCharts() {
    this.donutChartOptions = {
      series: [44, 55],
      chart: {
        type: 'donut',
        height: 200,
        startAngle: -90,
        endAngle: 90
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => '99'
              }
            }
          }
        }
      },
      labels: ['Team A', 'Team B'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
  }

}
