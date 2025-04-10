import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Iconicon from 'react-native-vector-icons/Ionicons';

import {HelperText, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../utils/global';

export default function TouchableInput({
  label,
  value,
  onPress,
  iconName = 'chevron-down',
  error,
}) {
  let {colors} = useTheme();
  let iconSize = 20;
  return (
    <>
      <TouchableOpacity
        className="w-full flex-row items-center justify-between border border-gray-300 rounded-xl px-4 h-[49px] my-2"
        style={{
          borderColor: hexToRgba(colors.text_disabled, 0.4),
          backgroundColor: 'transparent',
        }}
        onPress={onPress}
        activeOpacity={0.7}>
        <View className="flex-1">
          {label && value && (
            <Text
              className="text-xs font-regular absolute bottom-[27px] px-1"
              style={{
                color: colors.outline,
                backgroundColor: colors.background_default,
              }}>
              {label}
            </Text>
          )}
          <Text
            className={`text-secondary font-regular `}
            style={{
              color: colors.text_secondary,
            }}>
            {value || label}
          </Text>
        </View>
        <Iconicon name={iconName} size={iconSize} color={colors.iconColor} />
      </TouchableOpacity>

      {error && (
        <HelperText
          type="error"
          visible={error}
          className={'font-f_light'}
          style={{color: colors.error_main}}>
          {error}
        </HelperText>
      )}
    </>
  );
}
