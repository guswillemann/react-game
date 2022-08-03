import { useContext } from 'react';
import { KeyboardContext } from '../contexts/KeyboardContext';

const useKeyboard = () => useContext(KeyboardContext);

export default useKeyboard;
