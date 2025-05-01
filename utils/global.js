import {Dimensions as deviceDimension, Platform, Vibration} from 'react-native';
const Wwidth = deviceDimension.get('window').width;
const Wheight = deviceDimension.get('window').height;
const Activity_Opacity = 0.9;
const rippleColor = 'rgba(145 158 171 / 0.25)';
const isPlatformIOS=Platform.OS=="ios";



const hexToRgba = (color, alpha = 1) => {
  if (color.startsWith("rgb")) {
    // Convert "rgb(220, 184, 255)" to "rgba(220, 184, 255, alpha)"
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }
  color = color.replace("#", "");
  if (color.length === 3) {
    color = color.split("").map((char) => char + char).join("");
  }
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

 

export {Wwidth, Wheight, Activity_Opacity, rippleColor,hexToRgba,isPlatformIOS};
