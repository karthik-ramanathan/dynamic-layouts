import React from "react";

import ReactGridLayout, {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import StackItem from "../../components/DemoComponent/DemoComponent"

export default class GridLayout extends React.Component{

//...
render() {

  return (
    <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div key="a" data-grid={{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
        <div key="b" data-grid={{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, static: true}}><StackItem /></div>
        <div key="c" data-grid={{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true}}>c</div>
      </ReactGridLayout>
  )
}
}