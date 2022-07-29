import { useEffect, useReducer, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const Cell = ({ color }) => <div style={{ backgroundColor: color || 'transparent' }} className='grid-cell'></div>

const initialGrid = () => {
  const grid = [
    [],[],[],[],[],[],[],[],[],[],
  ];

  grid.forEach((row, y) => {
    for (let x = 0;x < 10;x++) {
      row.push(<Cell key={`${x}${y}`} />);
    }
  })

  return grid;
};

const greenifyReducer = (state, {x, y}) => {
  const newState = [...state];
  newState[y][x] = <Cell key={`${x}${y}`} color="green" />;
  return newState;
}

function App() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [grid, greenifyCell] = useReducer(greenifyReducer, initialGrid());

  useEffect(() => {
    greenifyCell({ y: yPos, x: xPos });
  }, [xPos, yPos, greenifyCell]);

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
            if (state === 9) return state;
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
            if (state === 9) return state;
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
      {grid.reduce((acc, cur) => {
        return acc.concat(cur)
      })}
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
