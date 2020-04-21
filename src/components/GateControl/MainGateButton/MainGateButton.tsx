import React from 'react';
import styled from 'styled-components';

interface Props {
    onClick: () => void;
    status: string;
}

const MainGateButton: React.FC<Props> = ({ status, onClick }: Props) => {
    return (
        <MainGateButtonStyled onClick={onClick}>
            <MainGateText>Main Gate</MainGateText>
            <MainGateStatusText>{status}</MainGateStatusText>
        </MainGateButtonStyled>
    );
};

const MainGateButtonStyled = styled.div`
    grid-area: main-gate;
    background-color: ${({ theme }): string => theme.colors.mainGateBg};

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

const MainGateText = styled.span`
    font-size: 2.25em;
`;

const MainGateStatusText = styled.span`
    font-size: 0.9em;
`;

export default MainGateButton;
