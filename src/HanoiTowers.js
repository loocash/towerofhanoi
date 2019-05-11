import React from 'react';
import Tower from './Tower';
import * as hanoi from './hanoi';
import _ from 'lodash';

class HanoiTowers extends React.Component {

  state = {
    plates: 4,
    towers: hanoi.getInitialState(4, 3),
    selected: null,
    moves: 0,
    solved: false,
  }

  reset = () => this.setState({
    towers: hanoi.getInitialState(this.state.plates, 3),
    selected: null,
    moves: 0,
    solved: false,
  })

  addPlate = () => {
    const {plates} = this.state;
    if (plates >= 8) return;
    this.setState(({plates: plates+1}), this.reset)
  }

  popPlate = () => {
    const {plates} = this.state;
    if (plates <= 1) return;
    this.setState(({plates: plates-1}), this.reset)
  }

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
        <nav className="level">
          <div className="level-item has-text-centered">
            <h1 className="title">Tower of Hanoi</h1>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Size</p>
              <p className="title">
                <span onClick={this.popPlate}>
                  <i className="fas fa-angle-left"></i>
                </span>
                {this.state.plates}
                <span onClick={this.addPlate}>
                  <i className="fas fa-angle-right"></i>
                </span>
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Moves</p>
              <p className="title">{moves}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Solved</p>
              <p className="title">
                {solved && <span><i className="fas fa-check"></i></span>}
                {!solved && <span><i className="fas fa-times"></i></span>}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <button className="button is-primary" onClick={this.reset} disabled={moves === 0}>Start Over</button>
          </div>
        </nav>
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
