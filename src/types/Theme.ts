import lightTheme from 'utils/lightTheme';
import darkTheme from 'utils/darkTheme';

export interface UseTheme {
    currentTheme: typeof darkTheme | typeof lightTheme;
    toggleTheme: () => void;
}
