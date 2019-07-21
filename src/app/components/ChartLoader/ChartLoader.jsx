import React from "react";

export const ChartTypes = {
    AREA: "AREA",
    LINE: "LINE",
    BAR: "BAR",
    PIE: "PIE",
    SCATTER: "SCATTER"
};

import Chart from "react-google-charts";

export default class ChartLoader extends React.Component {

    render() {
        if (!this.props.type in ChartTypes) {
            return (
                <div>Invalid Config</div>
            )
        }

        if (this.props.type == ChartTypes.AREA) {
            let rows = this.props.data.map((item) => {
                return [item.age, item.shares]
            });

            let columns = [
                {
                    type: "number",
                    label: "Age"
                },
                {
                    type: "number",
                    label: "shares"

                }
            ]
            return (
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="400px"
                    legendToggle
                    rows={rows}
                    columns={columns}
                />
            )
        }

        if (this.props.type == ChartTypes.LINE) {
            let rows = this.props.data.map((item) => {
                return [item.age, item.shares]
            });

            let data = this.props.data.map((item)=>{
                return [item.age, item.shares, item.balance]
            });
            data.unshift(
                ["Age", "shares", "balance"],
            )

            console.log(data)
            return (
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    legendToggle
                    data={data}
                />
            )
        }

        return (
            <div>
                Loading chart {this.props.type}
            </div>
        )
    }
}