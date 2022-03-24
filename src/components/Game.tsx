import * as React from 'react';

import { Board, BoardProps } from './Board';
import { Button, ButtonProps } from './Button';
import { GameContainer } from '../styles';

interface GameProps extends BoardProps, ButtonProps {}

export const Game: React.FC<GameProps> = ({
  tiles,
  inProgress,
  cashoutAvailable,
  onBet,
  onCashout,
  onClickTile
}) => (
  <GameContainer>
    <Button
      inProgress={inProgress}
      cashoutAvailable={cashoutAvailable}
      onBet={onBet}
      onCashout={onCashout}
    />
    <Board tiles={tiles} inProgress={inProgress} onClickTile={onClickTile} />
  </GameContainer>
);
