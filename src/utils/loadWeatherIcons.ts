import { DefaultTheme } from 'styled-components';

import sunImageLight from 'assets/images/weather/sun_light.png';
import partlyCloudyImageLight from 'assets/images/weather/partly_cloudy_light.png';
import snowImageLight from 'assets/images/weather/snow_light.png';
import cloudyImageLight from 'assets/images/weather/cloudy_light.png';
import thunderstormImageLight from 'assets/images/weather/thunderstorm_light.png';
import rainImageLight from 'assets/images/weather/rain_light.png';

import sunImageDark from 'assets/images/weather/sun_dark.png';
import partlyCloudyImageDark from 'assets/images/weather/partly_cloudy_dark.png';
import snowImageDark from 'assets/images/weather/snow_dark.png';
import cloudyImageDark from 'assets/images/weather/cloudy_dark.png';
import thunderstormImageDark from 'assets/images/weather/thunderstorm_dark.png';
import rainImageDark from 'assets/images/weather/rain_dark.png';

const loadWeatherIcons = (theme: DefaultTheme): any => {
    let weatherIcons = {};

    if (theme.name === 'LIGHT') {
        weatherIcons = {
            sun: sunImageLight,
            partlyCloudy: partlyCloudyImageLight,
            snow: snowImageLight,
            cloudy: cloudyImageLight,
            thunderstorm: thunderstormImageLight,
            rain: rainImageLight,
        };
    } else if (theme.name === 'DARK' || true) {
        weatherIcons = {
            sun: sunImageDark,
            partlyCloudy: partlyCloudyImageDark,
            snow: snowImageDark,
            cloudy: cloudyImageDark,
            thunderstorm: thunderstormImageDark,
            rain: rainImageDark,
        };
    }

    return weatherIcons;
};

export default loadWeatherIcons;
