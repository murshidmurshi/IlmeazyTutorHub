import * as React from 'react';
import {Button, Text, useTheme} from 'react-native-paper';
import {hexToRgba, rippleColor} from '../../../utils/global';
import {View} from 'react-native';

const TransparentBtn = ({label, bg, icon, onPress}) => {
  let {colors} = useTheme();
  let BgStyle = {
    backgroundColor:
      bg == true ? hexToRgba('rgb(220, 184, 255)', 0.4) : colors.green,
    borderColor: bg == false ? colors.green : 'transparent',
    borderWidth: bg == false ? 1 : 0, // Ensure border is visible when bg is false
  };
  let textcolor = bg == true ? '' : 'text-white';
  return (
    <Button
      rippleColor={rippleColor}
      mode="contained"
      onPress={onPress}
      className="rounded-xl "
      style={BgStyle} // ✅ Corrected style
    >
      <View className="flex-row  space-x-4">
        {icon}
        <Text className={`font-p_medium text-center text-[16px] ${textcolor} `}>
          {label}
        </Text>
      </View>
    </Button>
  );
};

export default TransparentBtn;
