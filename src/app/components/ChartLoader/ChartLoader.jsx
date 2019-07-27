import React from "react";

export const ChartTypes = {
    AREA: "AREA",
    LINE: "LINE",
    BAR: "BAR",
    SCATTER: "SCATTER"
};

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class ChartLoader extends React.Component {

    render() {

        const options = {
            responsive: {
                rules: [{
                  chartOptions: {
                    legend: {
                      align: 'center',
                      verticalAlign: 'bottom',
                      layout: 'horizontal'
                    }
                  }
                }]
              },
            title: {
                text: this.props.title || ""
            },
            subtitle: {
                text: this.props.subtitle || ""
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
            },
        
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
        
            colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
            series: []
        };


        let yAxisFields = [];
        if(typeof this.props.yAxis == "string"){
            yAxisFields.push(this.props.yAxis);
        }else{
            yAxisFields = this.props.yAxis;
        }

        for(var axis in yAxisFields){
            let series = [];
            for(var data in this.props.data){
                //new Date(this.props.data[data][this.props.xAxis]) != "Invalid Date"
                series.push([new Date(this.props.data[data][this.props.xAxis]), this.props.data[data][yAxisFields[axis]]])
            }
            options.series.push({
                name: yAxisFields[axis],
                data: series
            });
        }

        if (!this.props.type in ChartTypes) {
            return (
                <div>Invalid Config</div>
            )
        }

        if (this.props.type == ChartTypes.LINE) {
            options.chart = {
                type: 'spline'
            };
        }else if (this.props.type == ChartTypes.AREA) {
            options.chart = {
                type: 'areaspline'
            };
        }else if (this.props.type == ChartTypes.BAR) {
            options.chart = {
                type: 'column'
            };
        }else if (this.props.type == ChartTypes.SCATTER) {
            options.chart = {
                type: 'scatter'
            };
        }

        return (
            <HighchartsReact highcharts={Highcharts} options={options} allowChartUpdate={true} containerProps={{
                className: "customContainer"
            }}/>
        )

    }
}