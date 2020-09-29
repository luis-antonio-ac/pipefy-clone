import React, { useState } from 'react';
import BoardContext from './context';
import produce from 'immer';

import DataInterface from '../../interfaces/dataInterface';
import { loadLists } from '../../services/api';

import List from '../List';

import { Container } from './styles';

const data: Array<any> = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = useState<Array<DataInterface>>(data);

  function moveCard(fromList: number, toList: number, from: number, to: number) {
    setLists(
      produce(lists, (draft) => {
        const draggedCard = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, draggedCard);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, moveCard }}>
      <Container>
        {lists.map((list, index) => {
          return <List key={list.title} data={list} listIndex={index} />
        })}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
