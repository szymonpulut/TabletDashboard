// Settings Context - src/context/Settings
import React from 'react';
import darkTheme from 'utils/darkTheme';

const defaultSettings = {
    theme: darkTheme,
    mqtt: {
        lastMessage: {
            a: 'b',
            c: 'd',
        },
    },
};

const SettingsContext = React.createContext({
    settings: defaultSettings,
    setSettings: (values: any) => {},
});

export const SettingsProvider = ({ children, settings }: any): any => {
    const [currentSettings, setCurrentSettings] = React.useState(
        settings || defaultSettings,
    );

    const setSettings = (values: any): void => {
        setCurrentSettings(values);
    };

    return (
        <SettingsContext.Provider
            value={{ settings: currentSettings, setSettings }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
