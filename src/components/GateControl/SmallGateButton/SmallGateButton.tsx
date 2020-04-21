import React from 'react';
import styled from 'styled-components';

interface Props {
    onClick: () => void;
}
const SmallGateButton: React.FC<Props> = ({ onClick }: Props) => {
    return (
        <SmallGateButtonStyled onClick={onClick}>
            <SmallGateText>Small Gate</SmallGateText>
        </SmallGateButtonStyled>
    );
};

const SmallGateButtonStyled = styled.div`
    grid-area: small-gate;
    background-color: ${({ theme }): string => theme.colors.smallGateBg};

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

const SmallGateText = styled.span`
    font-size: 2.25em;
`;

export default SmallGateButton;
