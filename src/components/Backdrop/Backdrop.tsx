import React from 'react';
import styled from 'styled-components';

interface Props {
    isOn: boolean;
    onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ isOn, onClick }: Props) => {
    const keyDownHandler = (event: any): void => {
        if (event.keyCode === 27) {
            onClick();
        }
    };

    React.useEffect(() => {
        return (): void => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    if (isOn) {
        document.addEventListener('keydown', keyDownHandler);
    }

    return isOn ? (
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        <BackdropStyled
            onClick={onClick}
            onKeyDown={keyDownHandler}
            role="dialog"
            aria-modal="true"
        />
    ) : /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    null;
};

const BackdropStyled = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
