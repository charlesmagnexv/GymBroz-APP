import { extendTheme } from 'native-base';

export default function () {
    const theme = extendTheme({
        colors: {
            fuchsia: {
                400: '#C13C94',
                700: '#BD4291'
            },
            red: {
                600: '#EF233C'
            },
            dark: {
                50: '#07142B'
            }
        },
    });
}