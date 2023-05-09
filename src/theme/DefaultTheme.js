import color from 'color';
import {black, white} from './Colors';

const DefaultTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: '#ffffff',
    baseColor: '#eeeeee',
    primaryDark: '#ffffff',
    accent: '#e72224',
    lightGreen: '#77B052',
    black: '#000',
    white: '#FFF',
    cyanBlue: '#545b6a',
    grey: '#cecece',
    lynxWhite: '#F7F7F7',
    silver: '#bfbfbf',
    lightPeriwinkle: '#CAD8F2',
    shuttleGray: '#535a69',
    slateGrey: '#708090',
    wildSand: '#F5F5F5',
    shuttleGray: 'rgba(84,91,106,0.6)',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#B00020',
    onBackground: '#000000',
    onSurface: '#000000',
    text: black,
    itemBgColor: '#f7f7f7',
    inputTextBg: '#f7f7f7',
    inputTextPlaceHolder: '#a1aabf',
    slateGrey: '#68686a',
    veryLightPink: '#bfbfbf',
    dark: '#161e2c',
    paleGrey: '#eff1f5',

    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
  },
  // fonts: configureFonts(),
  // animation: {
  //   scale: 1.0,
  // },
};

export default DefaultTheme;
