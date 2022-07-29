import { useEffect, useReducer, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const GRID_SIZE = 20;
const Cell = ({ color }) => <div style={{ backgroundColor: color || 'transparent' }} className='grid-cell'></div>

const initialGrid = () => {
  const grid = [];

  for (let y = 0;y < GRID_SIZE;y++) {
    grid.push([]);
    for (let x = 0;x < GRID_SIZE;x++) {
      grid[y].push([]);
    }
  }

  return grid;
};

const gridReducer = (state, { type, position }) => {
  const { x, y } = position;
 
  switch (type) {
    case 'addFruit':
      state[y][x] = 'red';
      return state;
    case 'removeFruit':
      state[y][x] = undefined;
      return state;
    default:
      return new Error('missing gridDispatch action type');
  }
}

function App() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid());
  const [hasFruit, setHasFruit] = useState(false);

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
      setHasFruit(false);
      console.log('score');
    }
  }, [xPos, yPos, grid]);

  useEffect(() => {
    const cb = (e) => {
      const keyMap = {
        // left
        37: () => {
          setXPos((state) => {
            if (state === 0) return state;
            return state -= 1
          });
        },
        // right
        39: () => {
          setXPos((state) => {
            if (state === GRID_SIZE - 1) return state;
            return state += 1
          });
        },
        // up
        38: () => {
          setYPos((state) => {
            if (state === 0) return state;
            return state -= 1
          });
        },
        // down
        40: () => {
          setYPos((state) => {
            if (state === GRID_SIZE - 1) return state;
            return state += 1
          });
        },
      };

      keyMap[e.keyCode]?.();
    }

    document.addEventListener('keydown', cb);

    return () => {
      document.removeEventListener('keydown', cb);
    }
  }, []);

  return (
    <div className="App">
      {grid.reduce((acc, cur, y) => {
        const rowEls = cur.map((cell, x) => <Cell key={`${x}-${y}`} color={cell} />)
        return [...acc, ...rowEls]
      }, [])}
      <img
        style={{
          '--x-pos': xPos,
          '--y-pos': yPos,
        }}
        width={100}
        height={100}
        src={logo}
        className="App-logo"
        alt="logo"
      />
    </div>
  );
}

export default App;
