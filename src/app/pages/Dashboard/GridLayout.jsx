import React from "react";

import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import StackItem from "../../components/DemoComponent/DemoComponent"

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const StackOptions = {
  minW: 3,
  maxW: 12
}
export default class GridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null
    }
    this.saveConfig = this.saveConfig.bind(this);
  }

  componentDidMount() {
      let config = localStorage.getItem("config");
      if(!config){
          config = [
            { x: 0, y: 0, w: 8, h: 6, data: { data: "usersession", type: "AREA", xAxis: "dateTime", yAxis: "usersSessions" } },
            { x: 9, y: 0, w: 4, h: 6, data: { data: "usersession", type: "LINE", xAxis: "dateTime", yAxis: "uniqueUsers" } },
            { x: 0, y: 7, w: 12, h: 8, data: { data: "usersession", type: "BAR", xAxis: "dateTime", yAxis: "usersSessions" } }
          ]
      }else{
          config = JSON.parse(config);
      }
        this.setState({
        config: config
        })
  }

  saveConfig(){
    let config = this.state.config;
    localStorage.setItem("config",JSON.stringify(config));
}

  render() {
    if (this.state.config == null) {
      return (
        <div>
          Loading ...
        </div>
      )
    }
    return (
        <>
        <button onClick={this.saveConfig}>save config</button>
      <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200} autoSize={true} onResize={()=>{
        window.dispatchEvent(new Event('resize'));
      }} onLayoutChange={(layout)=>{
        console.log(layout);
      }}>
        {this.state.config.map((stack, index) => {
          let itemOptions ={
            minW: StackOptions.minW,
            maxW: StackOptions.maxW,
            x: stack.x,
            y: stack.y,
            w: stack.w,
            h: stack.h,
            i: index.toString()
          }
          return (
            <div key={index} data-grid={itemOptions} style={{overflow: "hidden"}}>
              <StackItem {...stack.data} />
            </div>
          )
        })}
      </ReactGridLayout>
      </>
    )
  }
}