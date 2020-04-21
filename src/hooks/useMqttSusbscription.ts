import React from 'react';

import MqttContext from 'context/MqttContext';
import { MqttContext as MqttContextType } from 'types/Mqtt';

const useMqttSubscription = <T>(topic: string): any => {
    const {
        mqtt,
        status,
        messages,
        addMessage,
        lastMessage,
    } = React.useContext<MqttContextType<any>>(MqttContext);
    const subscribed = React.useMemo(() => {
        if (mqtt) {
            return mqtt?.subscribe(topic);
        }
    }, [mqtt]);

    React.useEffect(() => {
        const getMessages = (): void => {
            subscribed?.on(
                'message',
                (t: string, message: { toString: () => string }) => {
                    let msg;
                    try {
                        msg = JSON.parse(message.toString());
                    } catch (e) {
                        msg = message.toString();
                    }

                    const packet = {
                        message: msg,
                        topic: t,
                    };

                    addMessage(packet);
                },
            );
        };
        getMessages();
    }, [subscribed, topic]);

    const msgs = messages.filter((msg) => {
        return topic === msg.topic;
    });
    const lastMessageOnTopic = msgs[msgs.length - 1];

    return {
        msgs,
        mqtt,
        status,
        lastMessage,
        lastMessageOnTopic,
        topic,
    };
};

export default useMqttSubscription;
