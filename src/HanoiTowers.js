import React from 'react';
import Tower from './Tower';
import * as hanoi from './hanoi';

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
        <div className="stats">
          <h3 className="moves">Moves: {moves}</h3>
          {solved && <h2 className="solved">Solved</h2>}
          {moves ? <button onClick={this.reset}>Start Over</button> : null}
        </div>
      </React.Fragment>
    )
  }
}

export default HanoiTowers;
