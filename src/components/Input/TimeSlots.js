import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text, useTheme} from 'react-native-paper';

export default function TimeSlots({data, selected, setSelected}) {
  let {colors} = useTheme();

  const handleSelect = item => {
    setSelected(prev => ({
      ...prev,
      [data?.title]: prev&&prev[data?.title] === item ? null : item, // Toggle selection
    }));
  };
  return (
    <View className="p-3">
      <Text
        className="text-[15px] font-p_medium mb-3"
        style={{
          color: colors.text_secondary,
        }}>
        {data?.title}
      </Text>
      <View className="flex flex-wrap flex-row gap-2">
        {data?.categories?.map((item, index) => {
          const isSelected = selected&&selected[data?.title] === item;
          return (
            <TouchableOpacity
              key={index}
              className="rounded-md px-4 py-1"
              onPress={() => handleSelect(item)}
              style={{
                backgroundColor: isSelected
                  ? colors.primary_main
                  : colors.surface,
              }}>
              <Text
                className="font-regular text-md"
                style={{
                  color: isSelected ? 'white' : colors.text_primary,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
