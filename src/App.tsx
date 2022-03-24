import * as React from 'react';
import styled from 'styled-components';

import { Game } from './components';
import { useAPI } from './hooks';
import { initialTiles } from './utils';

export const AppContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    max-width: 60rem;
    margin: 10rem;
  }
`;

export default function App() {
  const [tiles, setTiles] = React.useState(initialTiles);
  const [inProgress, setInProgress] = React.useState(false);
  const { bet, reveal, cashoutAvailable, cashout } = useAPI({
    tiles,
    setTiles,
    inProgress,
    setInProgress
  });

  return (
    <AppContainer>
      <Game
        tiles={tiles}
        inProgress={inProgress}
        onBet={() => bet.run()}
        onClickTile={(_, position) => reveal.run(position)}
        cashoutAvailable={cashoutAvailable}
        onCashout={() => cashout.run()}
      />
    </AppContainer>
  );
}
