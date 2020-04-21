// import original module declarations
import 'styled-components';
// import your custom theme
import lightTheme from 'utils/lightTheme';

// extend the module declarations using custom theme type

type Theme = typeof lightTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
