import * as React from 'react';
import {Button, Text, useTheme} from 'react-native-paper';
import {rippleColor} from '../../../utils/global';

const PrimaryButton = ({label, bg, onPress}) => {
  let {colors} = useTheme();
  let BgStyle = {
    backgroundColor: bg == false ? 'transparent' : colors.green,
    borderColor: bg == false ? colors.green : 'transparent',
    borderWidth: bg == false ? 1 : 0, // Ensure border is visible when bg is false
  };
  let textcolor = bg == false ? '' : 'text-white';
  return (
    <Button
      rippleColor={rippleColor}
      mode="contained"
      onPress={onPress}
      className="p-0.5 rounded-xl"
      style={BgStyle} // ✅ Corrected style
    >
      <Text className={`font-semi text-center text-lg ${textcolor} `}>
        {label}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
