import React from 'react';

import MqttContext from 'context/MqttContext';
import { MqttContext as MqttContextType } from 'types/Mqtt';

const useMqttState = <T>(): any => {
    const {
        status,
        mqtt,
        messages: allMessages,
        lastMessage,
    } = React.useContext<MqttContextType<T>>(MqttContext);

    return {
        status,
        mqtt,
        allMessages,
        lastMessage,
    };
};

export default useMqttState;
