import React from 'react';
import { connect, MqttClient, IClientOptions } from 'mqtt';
import {
    MqttStatus,
    Message,
    MessageStructure,
    MqttContext as MqttContextType,
} from 'types/Mqtt';

interface Props {
    brokerAddress?: string;
    options?: IClientOptions | undefined;
    children: React.ReactNode;
}

const MqttContext = React.createContext<MqttContextType<any>>(
    {} as MqttContextType<any>,
);

export const MqttProvider = ({
    children,
    brokerAddress,
    options,
}: Props): any => {
    const [status, setStatus] = React.useState<MqttStatus>('offline');
    const [mqtt, setMqtt] = React.useState<MqttClient>();
    const [messages, setMessages] = React.useState<Message<MessageStructure>[]>(
        [],
    );

    React.useEffect(() => {
        const mqttInstance = connect(brokerAddress, options);
        setMqtt(mqttInstance);
        mqttInstance.on('connect', () => setStatus('connected'));
        mqttInstance.on('reconnect', () => setStatus('reconnecting'));
        mqttInstance.on('close', () => setStatus('closed'));
        mqttInstance.on('offline', () => setStatus('offline'));

        return (): void => {
            mqttInstance.end();
        };
    }, []);

    const addMessage = React.useCallback((message: Message<{}>) => {
        setMessages((state) => [...state, message]);
    }, []);

    const checker = React.useEffect(() => {
        if (messages.length > 128) messages.length = 16;
    }, [messages]);

    const lastMessage = messages[messages.length - 1];

    return (
        <MqttContext.Provider
            value={{ status, mqtt, addMessage, messages, lastMessage }}
        >
            {children}
        </MqttContext.Provider>
    );
};

export const MqttContextConsumer = MqttContext.Consumer;

export default MqttContext;
