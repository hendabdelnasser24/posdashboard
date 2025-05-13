import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke,
  NgApexchartsModule,
  ApexGrid
} from "ng-apexcharts";
import { data } from './data';


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})


export class ChartsComponent {

  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions!: any;
  public activeOptionButton = "all";
  public updateOptionsData = {
    "1m": {
      xaxis: {
        min: new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime(),
        max: new Date().getTime()
      }
    },
    "6m": {
      xaxis: {
        min: new Date(new Date().setMonth(new Date().getMonth() - 6)).getTime(),
        max: new Date().getTime()
      }
    },
    "1y": {
      xaxis: {
        min: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime(),
        max: new Date().getTime()
      }
    },
    "1yd": {
      xaxis: {
        min: new Date(new Date().getFullYear(), 0, 1).getTime(),
        max: new Date().getTime()
      }
    },
    all: {
      xaxis: {
        min: undefined,
        max: undefined
      }
    }
  };
  


  constructor() {
    this.initChart();
  }

  initChart(): void {
    this.chartOptions = {
      series: [
        {
          data: data
        }
      ],
      chart: {
        type: "area",
        height: 350
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date().setDate(new Date().getDate() - 90),
            borderColor: "#999",
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        min: new Date().setMonth(new Date().getMonth() - 6),
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      colors: ['#66A0B2'],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    };
  }

  public updateOptions(option: keyof typeof this.updateOptionsData): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }


}
