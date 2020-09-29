import React from 'react';
import DataInterface from '../../interfaces/dataInterface';

import Card from '../Card';

import { MdAdd } from 'react-icons/md';
import { Container } from './styles';

interface Props {
  data: DataInterface;
  listIndex: number;
}

export interface ContainerProps {
  done?: boolean;
}

const List: React.FC<Props> = ({ data, listIndex }) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => {
          return <Card key={card.id} index={index} listIndex={listIndex} data={card} />
        })}
      </ul>
    </Container>
  );
};

export default List;
