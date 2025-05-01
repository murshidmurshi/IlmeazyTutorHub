import React from 'react';
import {Pressable} from 'react-native';
import {Text, RadioButton, useTheme} from 'react-native-paper';

export default function RadioSelector({selectedValue, setSelectedValue, data}) {
  const {colors} = useTheme();

  return (
    <RadioButton.Group onValueChange={setSelectedValue} value={selectedValue}>
      {data.map(item => (
        <Pressable
          key={item.value}
          onPress={() => setSelectedValue(item.value)}
          className="flex-row items-center mb-2">
          <RadioButton value={item.value} />
          <Text
            className="font-regular ml-2"
            style={{color: colors.text_primary}}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </RadioButton.Group>
  );
}
