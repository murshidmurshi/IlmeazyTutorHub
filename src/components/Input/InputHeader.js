import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, useTheme} from 'react-native-paper';

export default function InputHeader({label}) {
  let {colors} = useTheme();
  return (
    <>
      <View
        className="p-2 px-3 bg-red-300"
        style={{backgroundColor: colors.divider}}>
        <Text className="font-p_medium text-md  ">{label}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
