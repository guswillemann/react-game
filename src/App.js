import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const Cell = ({ color }) => <div style={{ backgroundColor: color || 'transparent' }} className='grid-cell'></div>

const initialGrid = () => {
  const grid = [
    [],[],[],[],[],[],[],[],[],[],
  ];

  grid.forEach((row, x) => {
    for (let y = 0;y < 10;y++) {
      row.push(<Cell key={`${x}${y}`} />);
    }
  })

  return grid;
};

function App() {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const grid = useRef(initialGrid());
  const greenifyCell = useCallback((x, y) => {
    grid.current[x][y] = <Cell key={`${x}${y}`} color="green" />
  }, []);

  useEffect(() => {
    greenifyCell(yPos, xPos);
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
      {grid.current.reduce((acc, cur) => {
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
