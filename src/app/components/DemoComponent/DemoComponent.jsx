import React, { Component } from "react";

require("./DemoComponent.less")

import DATA_SAMPLE1 from "./sample1.json";
import DATA_SAMPLE2 from "./sample2.json";

const responseData = {
	icartt: DATA_SAMPLE1,
	usersession: DATA_SAMPLE2
}

import ChartLoader, { ChartTypes } from "../ChartLoader/ChartLoader";
// a != "Invalid Date"

import { Select, Button } from "antd";

import 'antd/es/select/style';

export default class StackItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.type || "",
			data: this.props.data || null,
			xAxis: this.props.xAxis || null,
			yAxis: this.props.yAxis || null,
			editMode: null
		};
		this.isValid = this.isValid.bind(this)
	}

	componentDidMount(){
		this.setState({
			editMode: this.isValid()
		})
	}

	isValid() {
		if (this.state.data != null && this.state.type !== null && this.state.xAxis !== null && this.state.yAxis !== null) {
			return false
		}
		return true
	}

	render() {
		let chartTypes = [];
		let allAxisValues = [];

		if (this.state.editMode === null){
			return null
		}

		for (var type in ChartTypes) {
			chartTypes.push(
				<Select.Option value={ChartTypes[type]}>{ChartTypes[type].toLowerCase()} chart</Select.Option>
			)
		}
		
		if(this.state.data){
		for (var xAxis in responseData[this.state.data].report.items[0]) {
				allAxisValues.push(
					<Select.Option value={xAxis}>{xAxis.toLowerCase()}</Select.Option>
				)
			}
		}
		return (
			<div className="StackItem">
				{this.state.editMode &&
					<div>
						<div>

							<Select placeholder="Type of data" style={{ width: 150, marginRight: 15, marginLeft: 15 }} value={this.state.data} onChange={(value) => {
								this.state.data = value;
								this.state.xAxis = null;
								this.state.yAxis = null;
								this.setState({
									editMode: this.isValid()
								})
							}}>
								<Select.Option value="icartt">IcaRtt Data</Select.Option>
								<Select.Option value="usersession">User Logon Data</Select.Option>
							</Select>

							<Select  placeholder="Type of chart" style={{ width: 150, marginRight: 15, marginLeft: 15 }} value={this.state.type} onChange={(value) => {
								this.state.type = value;
								this.setState({
									editMode: this.isValid()
								})
							}}>
								{chartTypes}
							</Select>

{this.state.data &&
							<Select placeholder="xAxis data" style={{ width: 150, marginRight: 15, marginLeft: 15 }} value={this.state.xAxis} onChange={(value) => {
								this.state.xAxis = value;
								this.setState({
									editMode: this.isValid()
								})
							}}>
								{allAxisValues}
							</Select>
}

{this.state.data &&
							<Select placeholder="yAxis data" style={{ width: 150, marginRight: 15, marginLeft: 15 }} mode="multiple" style={{ width: 300 }} value={this.state.yAxis} onChange={(value) => {
								this.state.yAxis = value;
								this.setState({
									editMode: this.isValid()
								})
							}}>
								{allAxisValues}
							</Select>
}
						</div>
					</div>
				}
				{!this.state.editMode &&
					<>
						<Button onClick={() => {
							this.setState({
								editMode: true
							})
						}}>Edit</Button>
						<ChartLoader title="icaRtt Report Graph" type={this.state.type} data={responseData[this.state.data].report.items} xAxis={this.state.xAxis} yAxis={this.state.yAxis} />
					</>
				}
			</div>
		)
	}
}