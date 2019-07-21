import Button from "../../atomics/Button/Button";
import React, {Component} from "react";

require("./DemoComponent.less")

import JSON_BANK from "./bank.json";
import JSON_TRAFFIC from "./traffic.json";


import ChartLoader, {ChartTypes} from "../ChartLoader/ChartLoader";

export default class DemoComponent extends Component{
	render(){
		console.log(JSON_BANK, JSON_TRAFFIC)
		return (
			<div className="DemoComponent">
				<ChartLoader type={ChartTypes.LINE} data={JSON_BANK} />
			</div>
		)
	}
}