import React from 'react';

import { DefaultTheme } from 'styled-components';

import useSettings from 'hooks/useSettings';

import lightTheme from 'utils/lightTheme';
import darkTheme from 'utils/darkTheme';

import { UseTheme } from 'types/Theme';

const updateIntervalInMs = 5 * 60 * 1000;

const useTheme = (): UseTheme => {
    const [toggle, setToggle] = React.useState(false);
    const { settings, setSettings } = useSettings();

    const refreshTheme = (): void => {
        setToggle((toggle) => !toggle);
    };

    const checkTheme = React.useEffect(() => {
        const currentDate = new Date();
        const hour = currentDate.getHours();

        if (hour > 19 || hour < 8) {
            setSettings({ ...settings, theme: darkTheme });
        } else {
            setSettings({ ...settings, theme: lightTheme });
        }
    }, [toggle]);

    const setTimer = React.useEffect(() => {
        const timeIntervalId: ReturnType<typeof global.setInterval> = global.setInterval(
            () => {
                refreshTheme();
            },
            updateIntervalInMs,
        );

        return (): void => {
            clearInterval(timeIntervalId);
        };
    }, []);

    const toggleTheme = (): void => {
        if (settings.theme.name === 'DARK') {
            setSettings({ ...settings, theme: lightTheme });
        } else if (settings.theme.name === 'LIGHT') {
            setSettings({ ...settings, theme: darkTheme });
        }
    };

    return { currentTheme: settings.theme, toggleTheme };
};

export default useTheme;
