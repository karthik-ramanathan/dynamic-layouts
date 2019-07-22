import React, { Component } from "react";

require("./DemoComponent.less")

import DATA_SAMPLE1 from "./sample1.json";
import DATA_SAMPLE2 from "./sample2.json";


import ChartLoader, { ChartTypes } from "../ChartLoader/ChartLoader";
// a != "Invalid Date"

import { Select, Button } from "antd";

import 'antd/es/select/style';

export default class DemoComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "",
			data: null,
			xAxis: null,
			yAxis: null,
			editMode: true
		};
		this.isValid = this.isValid.bind(this)
	}


	isValid(){
		if(this.state.type !== null) {
			return true
		}
		return false
	}

	render() {
		let chartTypes = [];
		for(var type in ChartTypes){
			chartTypes.push(
			<Select.Option value={ChartTypes[type]}>{ChartTypes[type].toLowerCase()} chart</Select.Option>
			)
		}
		return (
			<div className="DemoComponent">
				{this.state.editMode &&
					<div>
						<div>
							<Select style={{ width: 300 }} value={this.state.type} onChange={(value) => {
								this.state.type = value;
								this.setState({
									editMode: this.isValid()
								})
							}}>
								{chartTypes}
								</Select>
						</div>
					</div>
				}
				{!this.state.editMode &&
					<>
					<Button onClick={()=>{
						this.setState({
							editMode: true
						})
					}}>Edit</Button>
					<ChartLoader title="icaRtt Report Graph" type={this.state.type} data={DATA_SAMPLE1.icaRttReport.items} xAxis={"dateTime"} yAxis={["excellent", "acceptable", "poor"]} />
					</>
				}
			</div>
		)
	}
}