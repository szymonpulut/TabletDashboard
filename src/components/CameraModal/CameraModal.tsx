import React from 'react';
import styled from 'styled-components';

interface Props {
    onClick: () => void;
    isOn: boolean;
}

const updateIntervalInMs = 3 * 1000;

const CameraModal: React.FC<Props> = ({ onClick, isOn }: Props) => {
    const [toggle, setToggle] = React.useState(false);

    const refreshCameraView = (isOn: boolean): void => {
        if (isOn) {
            setToggle((toggle) => !toggle);
        }
    };

    const setTimer = React.useEffect(() => {
        if (isOn) {
            const timeIntervalId = setInterval(() => {
                refreshCameraView(isOn);
            }, updateIntervalInMs);

            return (): void => {
                clearInterval(timeIntervalId);
            };
        }
    }, [isOn]);

    const preventCaching = `?${Math.floor(Math.random() * 100000)}`;
    const cameraView = `http://192.168.1.10/webcapture.jpg?command=snap&channel=1${preventCaching}`;

    return isOn ? (
        <CameraModalStyled onClick={onClick}>
            <img src={cameraView} alt="View from camera" />
        </CameraModalStyled>
    ) : null;
};

const CameraModalStyled = styled.div`
    z-index: 200;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -352px;
    margin-top -288px;
    background-color: white;
    width: 704px;
    height: 576px;

    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);

    img {
        width: 704px;
        height: 576px;
    }
`;

export default CameraModal;
