import styled, { css } from 'styled-components';
import { ContainerProps } from '.';

export const Container = styled.div<ContainerProps>`
  position: relative;
  cursor: grab;

  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);

  border-radius: 5px;
  border-top: 20px solid rgba(230, 236, 245, 0.4);

  margin-bottom: 10px;
  padding: 15px;

  header {
    position: absolute;
    top: -22px;
    left: 15px;
  }

  p {
    font-weight: 500;
    line-height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  ${(props) => props.isDragging && css`
    border: 2px dashed rgba(0, 0, 0, 0.2);
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    cursor: grab;

    p, img, span {
      opacity: 0;
    }
  `}
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  background-color: ${(props) => props.color};
`;
