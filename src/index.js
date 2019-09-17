import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';


/*
 * Individual Square class
 * Handle a square button whether to dislay nothing, X or O
 * @para: i as index of the sqaure on the board
 */
class Square extends Component {
  render() {
    return(
      <button
        className="square"
        onClick= {() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

/*
 * Board class
 * @para: input from user click
 *        when clicking it will then pass to a square to handle
 *                      or reset the board
 */
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
    };
  }

  // update the state as the game goes
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      isXNext: !this.state.isXNext,
    });
  }

  // reset the whole board to begin a new game
  reset(){
    const squares = this.state.squares.slice();
    for (let i = 0; i < squares.length; i++) {
      squares[i] = null;
    }
    this.setState({
      squares: squares,
      isXNext: true,
    })
  }

  // update the square as the game goes
  renderSquare(i) {
    return (
      <Square
        value ={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    }

    return(
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          <button onClick={() => this.reset()}>Reset the Game</button>
        </div>
      </div>

    );
  }
}



ReactDOM.render(<Board/>,document.getElementById('root'));

/*
 * Helper function for checking for the winner of the game
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
