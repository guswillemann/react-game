import { useReducer } from 'react';

type CounterAction = {
  type: 'increment' | 'decrement'
}

function reducer(state: number, { type }: CounterAction) {
  switch (type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error('missing useCounter dispatch action type');
  }
}

export default function useCounter(initialScore: number) {
  return useReducer(reducer, initialScore);
}
