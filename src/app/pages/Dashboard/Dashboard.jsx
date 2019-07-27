import React, {Component} from "react";
import AddRemoveLayout from "../../components/DemoComponent/AddRemoveLayout";
import GridLayout from "./GridLayout";

export default class Dashboard extends Component {
	render(){
		return(
		<div>
			{/* <AddRemoveLayout onLayoutChange={(l)=>{
				console.log(l)
			}}/> */}
			<GridLayout />
		</div>
		)
	}
}