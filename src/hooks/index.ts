import * as React from 'react';

import { clickBetButton, clickCashoutButton, clickTile } from '../api';
import { initialTiles, isRevealed, revealRemaining } from '../utils';
import { Tile } from '../components';

export function useFetch<P extends unknown[], R = null, E = null>(
  asyncFunction: (...params: P) => Promise<R>
): {
  run: (...params: P) => void;
  response: R | null;
  error: E | null;
} {
  const [response, setResponse] = React.useState<R | null>(null);
  const [error, setError] = React.useState<E | null>(null);

  const run = React.useCallback(
    (...params: P) => {
      setResponse(null);
      setError(null);

      asyncFunction(...params)
        .then((response) => setResponse(response))
        .catch((error) => setError(error));
    },
    [asyncFunction]
  );

  return { run, response, error };
}

export function useBetButton(
  setTiles: React.Dispatch<React.SetStateAction<Array<Tile>>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>
) {
  const bet = useFetch(clickBetButton);

  React.useEffect(() => {
    if (!bet.response) return;

    if (bet.response.status === 'progress') {
      setTiles(initialTiles);
      setInProgress(true);
    }
  }, [bet.response, setTiles, setInProgress]);

  return bet;
}

export function useRevealTile(
  setTiles: React.Dispatch<React.SetStateAction<Array<Tile>>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>
) {
  const reveal = useFetch(clickTile);

  React.useEffect(() => {
    if (!reveal.response) return;

    if (reveal.response.status === 'progress') {
      setTiles((tiles) => {
        if (!reveal.response) return tiles;

        const newTiles = tiles.concat();
        newTiles[reveal.response.tile - 1].type = 'gem';

        return newTiles;
      });
    }

    if (reveal.response.status === 'busted') {
      setTiles((tiles) => {
        if (!reveal.response || reveal.response.status !== 'busted') return tiles;

        const newTiles = revealRemaining(tiles, reveal.response.mines);
        newTiles[reveal.response.tile - 1].selected = false;

        return newTiles;
      });
      setInProgress(false);
    }
  }, [reveal.response, setTiles, setInProgress]);

  return reveal;
}

export function useCashoutButton(
  setTiles: React.Dispatch<React.SetStateAction<Array<Tile>>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>
) {
  const cashout = useFetch(clickCashoutButton);

  React.useEffect(() => {
    if (!cashout.response) return;

    const { mines } = cashout.response;
    if (cashout.response.status === 'cashout') {
      setTiles((tiles) => revealRemaining(tiles, mines));
      setInProgress(false);
    }
  }, [cashout.response, setTiles, setInProgress]);

  return cashout;
}

export function useAPI({
  tiles,
  setTiles,
  inProgress,
  setInProgress
}: {
  tiles: Array<Tile>;
  setTiles: React.Dispatch<React.SetStateAction<Array<Tile>>>;
  inProgress: boolean;
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const bet = useBetButton(setTiles, setInProgress);
  const reveal = useRevealTile(setTiles, setInProgress);
  const cashout = useCashoutButton(setTiles, setInProgress);
  const cashoutAvailable = React.useMemo(
    () => inProgress && isRevealed(tiles),
    [tiles, inProgress]
  );

  return { bet, reveal, cashout, cashoutAvailable };
}
