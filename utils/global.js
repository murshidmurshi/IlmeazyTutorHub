import {Dimensions as deviceDimension, Platform, Vibration} from 'react-native';
const Wwidth = deviceDimension.get('window').width;
const Wheight = deviceDimension.get('window').height;
const Activity_Opacity = 0.9;
const rippleColor = 'rgba(145 158 171 / 0.25)';
const isPlatformIOS=Platform.OS=="ios";


const hexToRgba = (hex, alpha = 1) => {
  if (hex.startsWith("rgb")) return hex; // If already in rgb() format, return as is
  hex = hex.replace("#", "");
  // If shorthand (3 characters), expand it (e.g., #abc → #aabbcc)
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

 

export {Wwidth, Wheight, Activity_Opacity, rippleColor,hexToRgba,isPlatformIOS};
