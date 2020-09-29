import { createContext } from 'react';
import DataInterface from '../../interfaces/dataInterface';

export default createContext({
  lists: Array<DataInterface>(),
  moveCard: (draggedListIndex: number, targetListIndex: number, from: number, to: number) => {},
});
