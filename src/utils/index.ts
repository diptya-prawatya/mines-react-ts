import { Tile } from '../components';

export const initialTiles = () => {
  const createTiles: Array<Tile> = new Array(25);

  for (var i = 0; i < createTiles.length; i++) {
    createTiles[i] = {
      type: 'undefined',
      selected: false
    };
  }

  return createTiles;
};

export const isRevealed = (tiles: Array<Tile>) => {
  return tiles.some((tile) => tile.type !== 'undefined');
};

export const revealRemaining = (tiles: Array<Tile>, mines: Array<number>) => {
  return tiles.map(
    (tile, index): Tile =>
      tile.type !== 'undefined'
        ? tile
        : { type: mines.includes(index + 1) ? 'mine' : 'gem', selected: true }
  );
};
