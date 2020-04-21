import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { MqttProvider } from 'context/MqttContext';
import { SettingsProvider } from 'context/SettingsContext';
import useTheme from 'hooks/useTheme';

import Clock from 'components/Clock/Clock';
import Weather from 'components/Weather/Weather';
import GateControl from 'components/GateControl/GateControl';
import CovidData from 'components/CovidData/CovidData';
import SensorList from 'components/SensorList/SensorList';
import Calendar from 'components/Calendar/Calendar';
import CameraModal from 'components/CameraModal/CameraModal';
import Backdrop from 'components/Backdrop/Backdrop';

const App: React.FC = () => {
    const { currentTheme } = useTheme();
    const [backdropIsOn, setBackdropIsOn] = React.useState(false);

    const backdropClicked = (): void => {
        setBackdropIsOn(false);
    };

    return (
        <SettingsProvider>
            <MqttProvider brokerAddress="ws://192.168.1.50:9001/ws">
                <ThemeProvider theme={currentTheme}>
                    <StyledApp>
                        <Backdrop
                            isOn={backdropIsOn}
                            onClick={backdropClicked}
                        />
                        <CameraModal
                            onClick={backdropClicked}
                            isOn={backdropIsOn}
                        />
                        <Clock />
                        <Weather />
                        <GateControl />
                        <CovidData />
                        <SensorList
                            onClick={(): void => {
                                setBackdropIsOn(true);
                            }}
                        />
                        <Calendar />
                    </StyledApp>
                </ThemeProvider>
            </MqttProvider>
        </SettingsProvider>
    );
};

const StyledApp = styled.div`
    color: ${({ theme }): string => theme.colors.font};
    height: 100%;
    width: 100%;
    line-height: 1.25;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        'clock clock gate-control gate-control'
        'clock clock covid-data covid-data'
        'weather weather sensor-list calendar'
        'weather weather sensor-list calendar';
`;

export default App;
