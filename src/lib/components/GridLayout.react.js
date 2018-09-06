import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout from 'react-grid-layout';

import utils from '../utils';

import './GridLayout.css';

export default class GridLayout extends Component {
  constructor(props) {
    super(props);

    // Bind `this` to functions so that they can be
    // passed as callbacks without scoping issues
    this.onLayoutChange = this.onLayoutChange.bind(this);

    this.state = {
      layout: props.layout
    };
  }

  /**
   * Callback for the onLayoutChange
   */
  onLayoutChange(layout) {
    if(this.props.setProps) {
      this.props.setProps({layout: layout});
    } else {
      this.setState({
        layout: layout
      });
    }
  }

  render() {

    let layout;
    if(this.props.setProps) {
      layout = this.props.layout;
    } else {
      layout = this.state.layout;
    }


    const unpackedChildren = utils.unpackChildren(this.props.children);
    const wrappedChildren = utils.wrapChildren(unpackedChildren, layout);

    return (
      <ReactGridLayout
        layout={layout}
        width={this.props.width}
        rowHeight={this.props.rowHeight}
        cols={this.props.cols}
        autoSize={this.props.autoSize}
        draggableCancel={this.props.draggableCancel}
        draggableHandle={this.props.draggableHandle}
        verticalCompact={this.props.verticalCompact}
        compactType={this.props.compactType}
        margin={this.props.margin}
        containerPadding={this.props.containerPadding}
        isDraggable={this.props.isDraggable}
        isResizable={this.props.isResizable}
        useCSSTransforms={this.props.useCSSTransforms}
        preventCollision={this.props.preventCollision}
        onLayoutChange={this.onLayoutChange}
        onDragStart={this.props.onDragStart}
        onDrag={this.props.onDrag}
        onDragStop={this.props.onDragStop}
        onResizeStart={this.props.onResizeStart}
        onResize={this.props.onResize}
        onResizeStop={this.props.onResizeStop}
      >
        { wrappedChildren }
      </ReactGridLayout>
    );
  }
}

GridLayout.propTypes = {
  /**
   * The ID used to identify the component in Dash callbacks
   */
  id: PropTypes.string,

  /**
   * A list of renderable child elements, that will be placed inside the grid
   */
  children: PropTypes.node,

  /**
   * The height, in pixels of a row in the grid
   */
  rowHeight: PropTypes.number,

  /**
   * The number of columns to display on the grid
   */
  cols: PropTypes.number,

  /**
   * The width, in pixels, of the grid
   */
  width: PropTypes.number,

  /**
   * If true, containers will automatically resize to fit the content
   */
  autoSize: PropTypes.bool,

  /**
   * CSS selector for tags that will not be draggable. Requires a leading '.'
   */
  draggableCancel: PropTypes.string,

  /**
   * CSS selector for tags that will act as the draggable handle. Requires a leading '.'
   */
  draggableHandle: PropTypes.string,

  /**
   * If true, the layout will compact vertically
   */
  verticalCompact: PropTypes.bool,

  /**
   * Compaction type.
   * One of 'vertical' and 'horizontal'
   */
  compactType: PropTypes.oneOf(['vertical', 'horizontal']),

  /**
   * Array of objects with the format:
   * { x: number, y: number, w: number, h: number }
   * If custom keys are used, then an optional `i` parameter can
   * be added that matches the key
   */
  layout: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    w: PropTypes.number.isRequired,
    h: PropTypes.number.isRequired,
    i: PropTypes.Number
  })),

  /**
   * Margin between items [x, y] in px
   */
  margin: PropTypes.arrayOf(PropTypes.number),

  /**
   * Padding inside the container [x, y] in px
   */
  containerPadding: PropTypes.arrayOf(PropTypes.number),

  /**
   * Elements can be dragged
   */
  isDraggable: PropTypes.bool,

  /**
   * Elements can be resized
   */
  isResizable: PropTypes.bool,

  /**
   * Use CSS transforms instead of Position. Improves performance if switched on
   */
  useCSSTransforms: PropTypes.bool,

  /**
   * If true, grid items won't change position when being
   * dragged over
   */
  preventCollision: PropTypes.bool,

  /**
   * Callback upon the layout changed
   * @param layout: the layout
   */
  onLayoutChange: PropTypes.func,

  /**
   * Callback when dragging is started
   */
  onDragStart: PropTypes.func,

  /**
   * Callback upon each drag movement
   */
  onDrag: PropTypes.func,

  /**
   * Callback upon drag completion
   */
  onDragStop: PropTypes.func,

  /**
   * Calls when resize starts
   */
  onResizeStart: PropTypes.func,

  /**
   * Calls when resize movement happens
   */
  onResize: PropTypes.func,

  /**
   * Calls when resize is complete
   */
  onResizeStop: PropTypes.func,

  /**
   * Dash-assigned callback that should be called whenever any of the properties change
   */
  setProps: PropTypes.func
};

GridLayout.defaultProps = ReactGridLayout.defaultProps;