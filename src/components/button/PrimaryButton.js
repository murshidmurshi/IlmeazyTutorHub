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
      className="p-1 rounded-xl mb-2"
      style={BgStyle} // ✅ Corrected style
    >
      <Text className={`font-semi text-center text-[17px] ${textcolor} `}>
        {label}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
