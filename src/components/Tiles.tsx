import React from 'react';

import { Gem, Mine, gem_audio, mine_audio } from '../assets';
import { TileContainer } from '../styles';

type Object = 'undefined' | 'gem' | 'mine';

export interface Tile {
  type: Object;
  selected: boolean;
}

interface TileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>, Tile {
  inProgress: boolean;
}

export const Tiles: React.FC<TileProps> = ({ inProgress, selected, type, ...props }) => {
  React.useEffect(() => {
    if (selected) return;
    if (type === 'gem') new Audio(gem_audio).play();
    if (type === 'mine') new Audio(mine_audio).play();
  }, [selected, type]);

  return (
    <TileContainer
      inProgress={inProgress}
      revealed={type !== 'undefined'}
      selected={selected}
      {...props}>
      {type === 'gem' ? <Gem /> : type === 'mine' ? <Mine /> : null}
    </TileContainer>
  );
};
