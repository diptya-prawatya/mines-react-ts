import React from 'react';

import { ButtonContainer, StyledButton } from '../styles';

export interface ButtonProps {
  inProgress: boolean;
  cashoutAvailable: boolean;
  onBet?: () => void;
  onCashout?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  inProgress,
  cashoutAvailable,
  onBet,
  onCashout
}) => {
  return (
    <ButtonContainer>
      <StyledButton
        backgroundColor={inProgress ? 'rgb(255,255,0)' : 'rgb(31, 255, 32)'}
        disabled={inProgress && !cashoutAvailable}
        onClick={() => (inProgress ? onCashout && onCashout() : onBet && onBet())}>
        {inProgress ? 'Cashout' : 'Bet'}
      </StyledButton>
    </ButtonContainer>
  );
};
