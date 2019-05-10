import React from 'react';
import Tower from './Tower';
import * as hanoi from './hanoi';
import _ from 'lodash';

class HanoiTowers extends React.Component {
  static defaultProps = {
    plates: 4,
    size: 3,
  }

  getInitialState = () => ({
    towers: hanoi.getInitialState(this.props.plates, this.props.size),
    selected: null,
    moves: 0,
    solved: false,
  })

  state = this.getInitialState()

  reset = () => this.setState(this.getInitialState())

  handleClick = (i) => {
    const {towers, selected, moves, solved} = this.state;
    if (solved) return;
    if (selected === i) {
      this.setState({selected: null});
    } else if (selected !== null) {
      const newTowers = hanoi.move(towers, [selected, i]);
      if (_.isEqual(newTowers, towers)) {
        this.setState({selected: null});
        return null;
      }
      this.setState({
        towers: newTowers,
        selected: null,
        moves: moves + 1,
        solved: hanoi.isSolved(newTowers)
      });
    } else { 
      this.setState({selected: i});
    }
  }

  render() {
    const {selected, moves, solved} = this.state;
    return (
      <React.Fragment>
        <div className="stats">
          <h2 className="moves">{solved ? `Solved in ${moves} moves`: `Moves: ${moves}`}</h2>
          <button onClick={this.reset} disabled={moves === 0}>Start Over</button>
        </div>
        <div className="HanoiTowers">
          {this.state.towers.map((tower, idx) => 
            <Tower 
              key={idx} 
              plates={tower} 
              onClick={() => this.handleClick(idx)}
              selected={selected === idx}
            />)
          }
        </div>
      </React.Fragment>
    )
  }
}

export default HanoiTowers;
