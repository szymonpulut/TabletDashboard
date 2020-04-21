import React from 'react';
import SettingsContext from 'context/SettingsContext';

const useSettings = (): any => {
    const context = React.useContext(SettingsContext);

    return context;
};

export default useSettings;
