import React from "react";

import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import StackItem from "../../components/DemoComponent/DemoComponent"

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./gridLayout.css";

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
    this.addWizard = this.addWizard.bind(this);
  }

  componentDidMount() {
      let config = localStorage.getItem("config");
      if(!config){
          config = [
            {x: 0, y: 0, w: 8, h: 6, data: { title: "test 1", data: "usersession", type: "AREA", xAxis: "dateTime", yAxis: "usersSessions" } },
            {x: 9, y: 0, w: 4, h: 6, data: { title: "test 2", data: "usersession", type: "LINE", xAxis: "dateTime", yAxis: "uniqueUsers" } },
            {x: 0, y: 7, w: 12, h: 8, data: { title: "test 3", data: "usersession", type: "BAR", xAxis: "dateTime", yAxis: "usersSessions" } }
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
    onRemoveItem(ind){
        this.state.config.splice(ind, 1);
        this.setState({})
    }
    addWizard(){
        let allY = [];
        for(var i=0;i<this.state.config.length;i++){
            allY.push(this.state.config[i].y + this.state.config[i].h);
        }

        this.state.config.push({x: 0, y: Math.max.apply(null,allY), w: 12, h: 8})
        this.setState({}, ()=>{
            scrollTo(0, document.body.scrollHeight)
        });
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
        <button onClick={this.addWizard}>Add Wizard</button>
      <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200} autoSize={true} onResize={()=>{
        window.dispatchEvent(new Event('resize'));
      }} onLayoutChange={(layout)=>{
        layout.map((item)=>{
          this.state.config[parseInt(item.i)].x = item.x;
          this.state.config[parseInt(item.i)].y = item.y;
          this.state.config[parseInt(item.i)].w = item.w;
          this.state.config[parseInt(item.i)].h = item.h;
        })
        this.setState({});
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
                <span className="remove"
                    onClick={this.onRemoveItem.bind(this, index)}
                    >x</span>
              <StackItem {...stack.data} onUpdate={function(index,data,type,xAxis,yAxis){
                this.state.config[index].data.data = data
                this.state.config[index].data.type = type
                this.state.config[index].data.xAxis = xAxis
                this.state.config[index].data.yAxis = yAxis
              }.bind(this, index)}/>
            </div>
          )
        })}
      </ReactGridLayout>
      </>
    )
  }
}