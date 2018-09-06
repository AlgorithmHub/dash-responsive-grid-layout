/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import _ from "lodash";

import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 

import {GridLayout, GridItem, ResponsiveGridLayout} from '../lib';

// class App extends Component {

//     render() {

//         var layout = [
//           {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
//           {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
//           {i: 'c', x: 4, y: 0, w: 1, h: 2}
//         ];
//         var style = {
//             borderStyle:  'solid',
//             height: '100%'
//         }

//         return (
//             <div>
//                 <GridLayout className="layout" layout={layout} rowHeight={30} width={1200}>
//                     <div key="a" style={style}>a</div>
//                     <div key="b" style={style}>b</div>
//                     <div key="c" style={style}>c</div>
//                 </GridLayout>
//             </div>
//         )
//     }  
// }

class App extends Component {

    constructor() {
        super();
        this.state = {
            items: [0, 1, 2, 3, 4].map(function(i, key, list) {
              return {
                i: i.toString(),
                x: i * 2,
                y: 0,
                w: 2,
                h: 2,
                add: i === (list.length - 1).toString()
              };
            }),
            newCounter: 0
          };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    createElement(el) {
        const removeStyle = {
          position: "absolute",
          right: "2px",
          top: 0,
          cursor: "pointer",
        };
        const i = el.add ? "+" : el.i;
        return (
          <div key={i} data-grid={el} style={{ borderStyle: "solid", height: "100%" }}>
            {el.add ? (
              <span
                className="add text"
                onClick={this.onAddItem}
                title="You can add an item by clicking here, too."
              >
                Add +
              </span>
            ) : (
              <span className="text">{i}</span>
            )}
            <span
              className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}
            >
              x
            </span>
          </div>
        );
      }    

      onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
          // Add a new item. It must have a unique key!
          items: this.state.items.concat({
            i: "n" + this.state.newCounter,
            x: (this.state.items.length * 2) % (this.state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2
          }),
          // Increment the counter to ensure key is always unique.
          newCounter: this.state.newCounter + 1
        });
      }

      onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
        this.setState({ layout: layout });
      }
    
      onRemoveItem(i) {
        console.log("removing", i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
      }      

    render() {
      console.log("rendering", this.state);

        var layouts = {
          lg: [
            {i: '0', x: 0, y: 0, w: 1, h: 2},
            {i: '1', x: 1, y: 0, w: 1, h: 2},
            {i: '2', x: 0, y: 1, w: 1, h: 2},
            {i: '3', x: 1, y: 1, w: 1, h: 2},
            {i: '4', x: 0, y: 2, w: 3, h: 2},
          ],
          md: [
            {i: '0', x: 0, y: 0, w: 1, h: 1},
            {i: '1', x: 1, y: 0, w: 1, h: 1},
            {i: '2', x: 2, y: 0, w: 1, h: 1},
            {i: '3', x: 3, y: 0, w: 1, h: 1},
            {i: '4', x: 4, y: 0, w: 1, h: 1},
          ],
          sm: [
            {i: '0', x: 0, y: 0, w: 1, h: 1},
            {i: '1', x: 1, y: 0, w: 1, h: 1},
            {i: '2', x: 2, y: 0, w: 1, h: 1},
            {i: '3', x: 3, y: 0, w: 1, h: 1},
            {i: '4', x: 4, y: 0, w: 1, h: 1},
          ]

        };

        return (
            <div>
                <ResponsiveGridLayout className="layout" layouts={layouts} width={1200}>
                {this.state.items.map(el => this.createElement(el))}
                </ResponsiveGridLayout>
            </div>
        )
    }
}

export default App;
