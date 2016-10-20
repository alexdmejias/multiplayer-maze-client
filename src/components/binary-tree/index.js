import React, {Component} from 'react';

import CellClass from '../../common/Cell';
import GridClass from '../../common/Grid';

import _ from 'lodash'; 

import './styles.css';
import classNames from 'classnames';


class BinaryTree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  prepareGrid(grid) {
    for (let i = 0; i < grid.eachCell().length; i++ ) {
      let cell = grid.eachCell()[i];
      let neighbors = [];

      if (cell.neighbors.north) {
        neighbors.push(cell.neighbors.north)
      }

      if (cell.neighbors.east) {
        neighbors.push(cell.neighbors.east)
      }

      let index = Math.floor(Math.random() * neighbors.length);
      let neighbor = neighbors[index];

      if (neighbor) {
        cell.link(neighbor);
      }
    }
    return grid;
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showBorders = true;
      console.log(this)
    }, 3000)
  }

  renderGrid(grid) { // works
    const elems = [];
    const borderWidth = 3;
    const size = 50;
    grid.eachRow().forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const rectProps = {
          top: (cell.row * size),
          left: (cell.column * size)
        };

        const neighborClasses = {
          'b-e': cell.linked(cell.neighbors.east) || !cell.neighbors.east,
          'b-s': cell.linked(cell.neighbors.south) || !cell.neighbors.south,
          'b-t': !cell.neighbors.north, 
          'b-w': !cell.neighbors.west 
        };

        const key = `${rowIndex} - ${cellIndex}`;
        elems.push( <div key={key} className={classNames('cell', neighborClasses)} style={rectProps} > </div> );
      });
    });

    return _.map(elems, (c) => c);
  }
  
  render() {
    const grid = new GridClass(10, 10);
    const prepared = this.prepareGrid(grid);
    return (
      <div className={this.state.showBorders? 'green': ''}>
          { this.renderGrid(grid) }
      </div>

    )
  }
}

export default BinaryTree;