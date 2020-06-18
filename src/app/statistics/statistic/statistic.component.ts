import { Component, OnInit } from '@angular/core';
import Utils from 'src/app/utils';
import { Chart } from 'src/assets/js/Chart.js';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {

  Linechart = [];
  charType: string = 'bar';
  fontSize = 24;
  peculiar: string;


  ngOnInit(): void {
    this.peculiar = this.route.parent.snapshot.firstChild.url[2].path
    this.statistics.getStatistics(this.peculiar).subscribe(
      (item: Map<string, number>) => {
        this.drawChart(Object.keys(item), Object.values(item))
        //  let x =[... item.keys()];
        // let x =Array.from(item.keys());
        // let labels = Object.keys(item);
        // let values = Object.values(item);
      }, error => {
        alert(this.peculiar + " Statistics Not Found Write Correct Link")
      })
  }

  constructor(private statistics: GlobalService, private route: ActivatedRoute) { }

  private drawChart(labels: string[], values: number[]) {
    this.Linechart = new Chart('canvas', {
      type: this.charType,
      // type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            borderColor: '#3cb371',
            backgroundColor: Utils.randomColors(labels.length),
          }
        ]
      },
      options: {
        legend: {
          display: false
          // display: true
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.peculiar.substring(0, 1).toUpperCase() + this.peculiar.substring(1),
              fontSize: this.fontSize
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Statistics",
              fontSize: this.fontSize
            }
          }],
        }
      }
    });
  }
}
