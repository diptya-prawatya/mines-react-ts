import styled from 'styled-components';

export const BoardContainer = styled.section`
  background-color: rgb(15, 33, 46);
  padding: 2rem;
`;

export const StyledTile = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

export const ButtonContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(33, 55, 67);
`;

export const StyledButton = styled.button<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem;
  border: none;
  width: 100%;
  font-size: 1rem;
`;

export const GameContainer = styled.section`
  display: grid;
  width: 100%;
  border-radius: 1rem;
  grid-template-columns: minmax(0, 20rem) auto;
  overflow: hidden;
`;

export const TileContainer = styled.button.attrs(
  ({
    inProgress,
    revealed,
    selected
  }: {
    inProgress: boolean;
    revealed: boolean;
    selected: boolean;
  }) => {
    const colorBase = 'rgb(54, 83, 99)';
    const colorDark = 'rgb(33, 55, 67)';
    const borderBottomBase = 'rgb(37, 61, 77)';

    const backgroundColor = inProgress
      ? revealed
        ? colorBase
        : colorDark
      : revealed && !selected
      ? colorDark
      : colorBase;

    const borderBottom = selected || revealed ? colorDark : borderBottomBase;

    const size = selected ? 60 : 80;

    return {
      inProgress,
      revealed,
      selected,
      backgroundColor,
      borderBottom,
      size
    };
  }
)`
  aspect-ratio: 1;
  border-width: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.backgroundColor};
  border-bottom: 0.25rem solid ${(props) => props.borderBottom};
  > * {
    width: ${(props) => props.size}%;
    height: ${(props) => props.size}%;
  }
`;
