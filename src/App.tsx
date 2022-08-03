import { FC } from 'react';
import KeyboardProvider from './contexts/KeyboardContext';
import GameView from './views/GameView';

const App: FC = () => {
  return (
    <KeyboardProvider>
      <GameView />
    </KeyboardProvider>
  );
}

export default App;
