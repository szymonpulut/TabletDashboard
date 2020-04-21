import React from 'react';
import styled from 'styled-components';

import useMqttSubscription from 'hooks/useMqttSusbscription';
import useMqttState from 'hooks/useMqttState';

import SmallGateButton from './SmallGateButton/SmallGateButton';
import MainGateButton from './MainGateButton/MainGateButton';

const alert = require('assets/audio/Deneb.wav');

const GateControl: React.FC = () => {
    const {
        lastMessageOnTopic: mainGateStatusRawMessage,
    } = useMqttSubscription('esp/GateInfo/MainGate');

    const mainGateStatusRaw = mainGateStatusRawMessage?.message;

    const { lastMessageOnTopic: mainGateOpenWatcher } = useMqttSubscription(
        'esp/OpenGates/maingate',
    );
    const { lastMessageOnTopic: smallGateOpenWatcher } = useMqttSubscription(
        'esp/OpenGates/smallgate',
    );

    const { mqtt } = useMqttState();

    const soundOnSmallGateOpen = React.useEffect(() => {
        if (typeof smallGateOpenWatcher !== 'undefined') {
            if (smallGateOpenWatcher?.message === 'start opening: 15') {
                new Audio(alert).play();
            }
        }
    }, [smallGateOpenWatcher]);

    const soundOnMainGateOpen = React.useEffect(() => {
        if (typeof mainGateOpenWatcher !== 'undefined') {
            if (mainGateOpenWatcher?.message === 'start opening') {
                new Audio(alert).play();
            }
        }
    }, [mainGateOpenWatcher]);

    let mainGateStatus = '';

    switch (mainGateStatusRaw) {
        case 'OPEN':
            mainGateStatus = 'open';
            break;
        case 'CLOSED':
            mainGateStatus = 'closed';
            break;
        case 'PARTIAL':
            mainGateStatus = 'partially open';
            break;
        case 'unknown':
        default:
            mainGateStatus = 'unknown';
            break;
    }

    const onSmallGateOpen = (): void => {
        const onSmallGateOpenAsync = async (): Promise<any> => {
            return mqtt?.publish('android/tabletdashboard/smallgate', 'open');
        };
        onSmallGateOpenAsync();
    };

    const onMainGateOpen = (): void => {
        const onMainGateOpenAsync = async (): Promise<any> => {
            return mqtt?.publish('android/tabletdashboard/maingate', 'change');
        };
        onMainGateOpenAsync();
    };

    return (
        <GateControlStyled>
            <SmallGateButton onClick={onSmallGateOpen} />
            <MainGateButton status={mainGateStatus} onClick={onMainGateOpen} />
        </GateControlStyled>
    );
};

const GateControlStyled = styled.div`
    grid-area: gate-control;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'small-gate main-gate';
`;

export default GateControl;
