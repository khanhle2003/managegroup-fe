    import { isPlatformBrowser } from '@angular/common';
    import { ChangeDetectorRef, Component, effect , inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
    import { ChartModule } from 'primeng/chart';
    import { SectionCountryComponent } from "./section-country/section-country.component";



    @Component({
    selector: 'app-country-chart',
    standalone: true,
    imports: [ChartModule, SectionCountryComponent],
    templateUrl: './country-chart.component.html',
    styleUrls: ['./country-chart.component.css']
    })
    export class CountryChartComponent implements OnInit {
      updateChartData2(selectedCategories: any[], counts: any[]) {
        throw new Error('Method not implemented.');
      }
        data: any;
        options: any;
        platformId = inject(PLATFORM_ID);

        constructor(private cd: ChangeDetectorRef) {}

        ngOnInit() {
            this.initChart();

        }
        ngAfterViewInit() {
            this.cd.detectChanges();
          }


    initChart() {
        if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        this.data = {
            labels: [],
            datasets: [{
              label: 'Số lượng quốc gia',
              backgroundColor: 'rgba(255, 26, 145, 1)',
              borderColor: 'rgba(255, 26, 145, 1)',
             data: []
            }]
        };

        this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
            legend: {
                labels: {
                color: textColor
                }
            }
            },
            scales: {
            x: {
                ticks: {
                color: textColorSecondary,
                font: {
                    weight: 500
                }
                },
                grid: {
                color: surfaceBorder,
                drawBorder: false
                }
            },
            y: {
                ticks: {
                color: textColorSecondary
                },
                grid: {
                color: surfaceBorder,
                drawBorder: false
                }
            }
            }
        };
        this.cd.markForCheck();
        }
    }


    @ViewChild('chart') chart: any;

        updateChartData(countries: string[], counts: number[],countsFromSecondAPI:number[]) {
            this.data = {
                labels: [...countries],
                datasets: [
                    {
                        label: 'Số lượng quốc gia đoàn ra',
                        backgroundColor: 'rgba(0, 255, 255, 1)',
                        borderColor: 'rgba(0, 255, 255, 1)',
                        data: [...counts]
                    }, 
                        {
                            label: 'Số lượng quốc gia đoàn vào',
                            backgroundColor: 'rgba(255, 26, 145, 1)',
                            borderColor: 'rgba(255, 26, 145, 1)',
                            data: [...countsFromSecondAPI]
                        }
                
                ]
            };
            this.cd.detectChanges();
            if (this.chart && this.chart.chart) {
                this.chart.chart.update();
        }


    }


}


