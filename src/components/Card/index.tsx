import React, { useRef, useContext } from 'react';
import BoardContext from '../Board/context';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import { Container, Label } from './styles';

interface Props {
  data: {
    id: number;
    content: string;
    user: string;
    labels: Array<string>;
  };
  index: number;
  listIndex: number;
}

export interface ContainerProps {
  isDragging: boolean;
}

const Card: React.FC<Props> = ({ data, index, listIndex }) => {
  const containerRefs = useRef<HTMLDivElement>(null);
  const { moveCard } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',

    hover(item, monitor) {
      // @ts-ignore-start
      const draggedCardIndex = item.index as number;
      const targetCardIndex = index;
      // @ts-ignore-end

      // @ts-ignore-start
      const draggedListIndex = item.listIndex as number;
      const targetListIndex = listIndex
      // @ts-ignore-end

      if (draggedCardIndex === targetCardIndex && draggedListIndex === targetListIndex) return;
      if (containerRefs.current === null) return;

      const targetCardSize = containerRefs.current.getBoundingClientRect();
      const targetCardCenter = targetCardSize.height / 2;

      const draggedOffset = monitor.getClientOffset() as XYCoord;
      const draggedTop = draggedOffset.y - targetCardSize.top;

      // Evitar a realizacao de operacoes desnecessarias
      // pois o cartao ja esta na posicao desejada
      if (draggedCardIndex < targetCardIndex && draggedTop < targetCardCenter) {
        return;
      }
      if (draggedCardIndex > targetCardIndex && draggedTop > targetCardCenter) {
        return;
      }

      moveCard(draggedListIndex, targetListIndex, draggedCardIndex, targetCardIndex);

      // @ts-ignore-start
      item.index = targetCardIndex;
      // @ts-ignore-end

      // @ts-ignore-start
      item.listIndex = targetListIndex
      // @ts-ignore-end
    },
  });

  dragRef(dropRef(containerRefs));

  return (
    <Container ref={containerRefs} isDragging={isDragging}>
      <header>
        {data.labels.map((label) => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="Avatar" />}
    </Container>
  );
};

export default Card;
