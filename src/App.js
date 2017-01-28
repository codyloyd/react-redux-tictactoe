import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import './App.css';

//redux reducers:
const gameboard = (state=[null,null,null,null,null,null,null,null,null],action) => {
  switch(action.type){
    case 'PLACE_MARKER':
      return state.map((x,i) => 
        i === action.positon ? action.marker : x);
    default:
    return state;  
  }
}

const currentPlayer = (state='X',action) => {
  switch(action.type){
    case 'SWITCH_PLAYER':
      return state === 'X' ? 'O' : 'X';
    default:
      return state;
  }
}

const game = combineReducers({gameboard,currentPlayer})
const store = createStore(game);

//React Components
const Square = ({marker,onclick}) => 
  <div 
    className="square"
    onClick={() => onclick()}
    >{marker}</div>

const Board = ({board}) => {
  return(
    <div className="board">
      {board.map((x,i) => 
        <Square 
          marker={x}
          key={i}
          onclick={() => {
              store.dispatch({
                type: 'PLACE_MARKER',
                positon: i,
                marker: store.getState().currentPlayer
              })
              store.dispatch({type: 'SWITCH_PLAYER'})
            }
          }
        />
      )}
    </div>
  )
}

const Title = props => <h1>tictactoe</h1>

const App  = props => {
  return (
    <div>
      <Title />
      <Board board={store.getState().gameboard} />
    </div>
  );
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

store.subscribe(render)
export default App;


store.dispatch({type: 'SWITCH_PLAYER'})
// store.dispatch({
//   type: 'PLACE_MARKER',
//   positon: 1,
//   marker: 'X'
// })
// store.dispatch({
//   type: 'PLACE_MARKER',
//   positon: 4,
//   marker: 'X'
// })
// store.dispatch({
//   type: 'PLACE_MARKER',
//   positon: 6,
//   marker: 'O'
// })
