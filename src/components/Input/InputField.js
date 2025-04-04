import React from 'react';
import {HelperText, TextInput, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../utils/global';
import {View, Text} from 'react-native';

const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  onBlur,
  error,
  touched,
  limit,
  righticon,
  onPress,
  disabled
}) => {
  let {colors} = useTheme();

  return (
    <View className="my-1">
      <TextInput
      disabled={disabled}
      onPress={onPress}
        maxLength={limit}
        value={value}
        label={
          <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
            {label}
          </Text>
        } // ✅ Custom font applied
        onChangeText={onChangeText}
        style={{
          backgroundColor: 'transparent',
          height: 52,
        }}
        className="text-md px-1 font-medium"
        mode="outlined"
        placeholderTextColor={colors.gray}
        onBlur={onBlur}
        error={error}
        theme={{
          colors: {
            primary: colors.primary,
            outline: hexToRgba(colors.text_disabled, 0.4),
            error: hexToRgba(colors.error_main, 0.3),
          },
        }}
        contentStyle={{
          fontFamily: 'Poppins-Regular', // ✅ Apply font for input text
          fontSize: 14,
          top: 2,
        }}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        right={righticon || null}
      />
      {error && (
        <HelperText
          type="error"
          visible={!!(error && touched)}
          className={'font-f_light'}
          style={{color: colors.error_main}}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default InputField;
