import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import styles from './styles';
import Cell from '../Cell';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.width = 500;
    this.height = 500;

    this.renderGrid = this.renderGrid.bind(this);
  }

  renderGrid() {
    const { size } = this.props;
    let x = 1;
    let y = 1;
    const cellSize = Math.floor(this.width / size);
    let id = 0;
    const cells = [];

    _.times(size, () => {
      _.times(size, () => {
        cells.push(
          <Cell
            key={id}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            north
            south
            east
            west
          />
        );
        x += cellSize;
        id += 1;
      });
      y += cellSize;
      x = 1;
    });

    return _.map(cells, c => c);
  }

  render() {
    return (
      <div style={styles.root}>
      {
        this.renderGrid()
      }
      </div>
    );
  }
}

Grid.propTypes = {
  size: PropTypes.number.isRequired
};

export default Grid;
