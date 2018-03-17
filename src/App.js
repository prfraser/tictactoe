import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      turn: 'X',
      board: Array(9).fill(''),
      totalMoves: 0,
      xWins: 0,
      oWins: 0,
      draws: 0
    }
  }

  clicked = (event) => {
    if (this.checkWinner()) return;
    if (!this.state.board[event.target.dataset.square]) {
      const newBoard = this.state.board.slice()
      newBoard[event.target.dataset.square] = this.state.turn

      event.target.innerText = this.state.turn;

      this.setState(prevState => ({
        turn: this.state.turn === 'X' ? 'O' : 'X',
        board: newBoard,
        totalMoves: ++prevState.totalMoves
      }));
    }
  }

  checkWinner = () => {
    const moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const board = this.state.board;
    for(let i = 0; i < moves.length; i++) {
      if(board[moves[i][0]] && board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][0]];
      }
    }
    if(this.state.totalMoves === 9) {
      return 'draw';
    }
    return null
  }

  restartGame = (result) => {
    const squares = document.getElementsByClassName('square')
    for(let i = 0; i < squares.length; i++) {
      squares[i].innerText = ''
    }
    if (result === 'X') {
      this.setState(prevState => ({
        xWins: ++prevState.xWins,
        board: Array(9).fill(''),
        totalMoves: 0
      }))
    } else if (result === 'O') {
      this.setState(prevState => ({
        oWins: ++prevState.oWins,
        turn: 'X',
        board: Array(9).fill(''),
        totalMoves: 0
      }))
    } else if (result === 'draw') { 
      this.setState(prevState => ({
        draws: ++prevState.draws,
        turn: 'X',
        board: Array(9).fill(''),
        totalMoves: 0
      }))
    } else {
      this.setState(prevState => ({
        turn: 'X',
        board: Array(9).fill(''),
        totalMoves: 0
      }))
    }
  }

  render() {
    const { turn, xWins, oWins, draws } = this.state
        
    let result = this.checkWinner();
    let winnerLine;

    if(result === 'X') {
        winnerLine = 'Match won by X'
    } else if(result === 'O') {
        winnerLine = 'Match won by O'
    } else if(result === 'draw') {
        winnerLine = 'Match is drawn'
    }

    return (
      <div id="wrapper">
        <div id="head">Welcome to Tic-Tac-Toe</div>
        <div id="game">
          <div id="scoreboard">
            <h3>Scoreboard</h3>
            <div id="scores">
              Player X: { xWins } 
              <br />
              Player O: { oWins }
              <br />
              <p>Draws: { draws }</p>
            </div>
          </div>
          <div id="board" onClick={ (e) => this.clicked(e) }>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>
          <div id="right-side">
            { winnerLine ? 
              <div id="status">{ winnerLine }</div> 
              :
              <div id="turn">Next turn: Player { turn }</div> 
            }
            <button id="restart-button" onClick={() => this.restartGame(result)}>Restart Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
