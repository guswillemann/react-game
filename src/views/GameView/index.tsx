import { CSSProperties, ReactNode, useEffect, useReducer, useState } from 'react';
import Cell from '../../components/Cell';
import { GRID_SIZE } from '../../constants';
import useCounter from '../../hooks/useCounter';
import useKeyboard from '../../hooks/useKeyboard';
import logo from '../../logo.svg';
import { CellGrid } from '../../types';
import cloneDeep from '../../utils/cloneDeep';
import createEmptyCellGrid from '../../utils/createEmptyCellGrid';
import './App.css';

const gridReducer = (state: CellGrid, action: any) => {
  const newState = cloneDeep(state);
  const { x, y } = action.position;
 
  switch (action.type) {
    case 'addFruit':
      newState[y][x] = 'red';
      return newState;
    case 'removeFruit':
      newState[y][x] = undefined;
      return newState;
    default:
      throw new Error('missing gridDispatch action type');
  }
}

function GameView() {
  const keyboard = useKeyboard();
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [grid, gridDispatch] = useReducer(gridReducer, createEmptyCellGrid());
  const [hasFruit, setHasFruit] = useState(false);
  const [score, scoreDispatch] = useCounter(0);

  useEffect(() => {
    if (hasFruit) return;

    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    gridDispatch({
      type: 'addFruit',
      position: { x, y }
    });

    setHasFruit(true);
  }, [hasFruit]);

  useEffect(() => {
    if (grid[yPos][xPos] === 'red') {
      gridDispatch({
        type: 'removeFruit',
        position: { x: xPos, y: yPos }
      });
      scoreDispatch({ type: 'increment' });
      setHasFruit(false);
    }
  }, [xPos, yPos, grid, scoreDispatch]);

  useEffect(() => {
    const keyMap: Record<KeyboardEvent['key'], () => void> = {
      ArrowLeft: () => {
        setXPos((state) => {
          if (state === 0) return state;
          return state -= 1
        });
      },
      ArrowRight: () => {
        setXPos((state) => {
          if (state === GRID_SIZE - 1) return state;
          return state += 1
        });
      },
      ArrowUp: () => {
        setYPos((state) => {
          if (state === 0) return state;
          return state -= 1
        });
      },
      ArrowDown: () => {
        setYPos((state) => {
          if (state === GRID_SIZE - 1) return state;
          return state += 1
        });
      },
    };

    const keyActions = Object.keys(keyMap);
    keyActions.forEach((actionKey) => {
      keyboard.subscribe(actionKey, keyMap[actionKey]);
    })
    
    return () => {
      keyActions.forEach((actionKey) => {
        keyboard.unsubscribe(actionKey, keyMap[actionKey]);
      })
    }
  }, [keyboard]);

  return (
    <>
      <h1>React Snake</h1>
      <span className='score'>Score: {score}</span>
      <div className="App">
        {grid.reduce((acc, cur, y) => {
          const rowEls = cur.map((cell, x) => <Cell key={`${x}-${y}`} color={cell} />)
          return [...acc, ...rowEls]
        }, [] as ReactNode[])}
        <img
          style={{
            '--x-pos': xPos,
            '--y-pos': yPos,
          } as CSSProperties}
          width={100}
          height={100}
          src={logo}
          className="App-logo"
          alt="logo"
        />
      </div>
    </>
  );
}

export default GameView;
