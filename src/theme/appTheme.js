import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

const commonColors = {
  primary_light: 'rgb(247, 241, 255)',
  primary_main: 'rgb(94, 49, 147)',
  primary_dark: 'rgb(200, 141, 0)',
  iconGray: 'rgb(103, 109, 117)',
  iconhigh: 'rgb(171, 183, 194)',
  error_main: 'rgb(246, 69, 89)',
  iconColor: 'rgb(158, 162, 190)',
  iconColor2: 'rgb(184, 188, 189)',

  gray: 'rgb(99, 99, 100)',
  header: 'rgba(20, 26, 33, 0.08)', // #141a2114 converted to rgba
  outline: 'rgb(187, 185, 185)',
  warning: 'rgb(247, 199, 118)',
  green: 'rgb(10 179 169)',
};

export const lightTheme = {
  ...MD3LightTheme,
  custom: 'lightTheme',
  colors: {
    ...MD3LightTheme.colors,
    ...commonColors,
    background_paper: '#FFFFFF',
    background_default: '#F8F8F8',
    background_neutral: '#F1F1F1',
    text_primary: '#030303',
    text_secondary: '#181818',
    text_disabled: '#636364',
    divider: 'rgb(238, 238, 238)',
    Base: '#F8F8F8',
    Base2: 'rgb(238, 238, 238)',
  },
  roundness: 14,
};

export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'darkTheme',
  colors: {
    ...MD3DarkTheme.colors,
    ...commonColors,
    background_paper: '#282c2f',
    background_default: '#000000',
    background_neutral: '#1A1A19',
    text_primary: '#F8F8F8',
    text_secondary: '#E1E0DC',
    text_disabled: '#636364',
    divider: 'rgb(29, 27, 30)', //Deep Gray (Stronger separation)
    Base: '#F8F8F8',
    Base2: '#E1E0DC',
  },
  roundness: 14,
};
