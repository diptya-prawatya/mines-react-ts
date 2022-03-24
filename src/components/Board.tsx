import React from 'react';

import { BoardContainer, StyledTile } from '../styles';
import { Tile, Tiles } from './Tiles';

export interface BoardProps {
  tiles: Array<Tile>;
  inProgress: boolean;
  onClickTile?: (e: React.MouseEvent<HTMLButtonElement>, position: number) => void;
}

export const Board: React.FC<BoardProps> = ({ tiles, inProgress, onClickTile }) => {
  return (
    <BoardContainer>
      <StyledTile>
        {tiles.map(({ type, selected }, index) => (
          <Tiles
            disabled={!inProgress}
            inProgress={inProgress}
            key={index}
            type={type}
            selected={selected}
            onClick={(e) => onClickTile && onClickTile(e, index + 1)}
          />
        ))}
      </StyledTile>
    </BoardContainer>
  );
};
