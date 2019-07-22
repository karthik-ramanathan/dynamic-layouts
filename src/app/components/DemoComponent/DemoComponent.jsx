import Button from "../../atomics/Button/Button";
import React, {Component} from "react";

require("./DemoComponent.less")

import DATA_SAMPLE1 from "./sample1.json";
import DATA_SAMPLE2 from "./sample2.json";


import ChartLoader, {ChartTypes} from "../ChartLoader/ChartLoader";
// a != "Invalid Date"

import {Select} from "antd";
import 'antd/dist/antd.css';

export default class DemoComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			type: "",
			data: null,
			xAxis: null,
			yAxis: null,
			editMode: true
		}
	}
	render(){
		return (
			<div className="DemoComponent">
				{this.state.editMode &&
					<div>
						<div>
							<Select style={{width: 300}} onChange={(value)=>{
								this.setState({
									type: value,
									editMode: false
								})
							}}>
								<Select.Option value="LINE">Line Chart</Select.Option>
								<Select.Option value="BAR">Bar Chart</Select.Option>
								<Select.Option value="AREA">Area Chart</Select.Option>
								<Select.Option value="SCATTER">Scatter Chart</Select.Option>
								</Select>
						</div>
					</div>
				}
				{!this.state.editMode &&
				<ChartLoader title="icaRtt Report Graph" type={this.state.type} data={DATA_SAMPLE1.icaRttReport.items} xAxis={"dateTime"} yAxis={["excellent","acceptable","poor"]} />
				}
			</div>
		)
	}
}