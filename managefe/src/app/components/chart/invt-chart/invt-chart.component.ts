import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { SectionInvtComponent } from './section-invt/section-invt.component';

@Component({
  selector: 'app-invt-chart',
  standalone: true,
  imports: [ChartModule,SectionInvtComponent],
  templateUrl: './invt-chart.component.html',
  styleUrl: './invt-chart.component.css'
})
export class InvtChartComponent implements OnInit {
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
                datasets: [
                    {
                        label: 'Số lượng đơn vị  ',
                        backgroundColor: 'rgba(255, 26, 145, 1)',
                        borderColor: 'rgba(255, 26, 145, 1)',
                        data: []
                    }
                
                ]
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
            this.cd.markForCheck()
        }


    }


    @ViewChild('chart') chart: any;
        updateChartData(invitationUnits: string[], counts: number[]) {
            this.data = {
                labels: invitationUnits.map(unit => unit.length > 10 ? unit.substring(0, 10) + '...' : unit),
                datasets: [
                    {
                        label: 'Số lượng đơn vị',
                        backgroundColor: 'rgba(255, 26, 145, 1)',
                        borderColor: 'rgba(255, 26, 145, 1)',
                        data: [...counts],
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem: { dataIndex: number }) => invitationUnits[tooltipItem.dataIndex]
                            }
                        }
                    }
                ]
            };
            this.cd.detectChanges();
            if (this.chart && this.chart.chart) {
                this.chart.chart.update();
            }
        }

}
