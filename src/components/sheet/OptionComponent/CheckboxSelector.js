import {Pressable, View} from 'react-native';
import {Checkbox, Text, useTheme} from 'react-native-paper';

export default function CheckboxSelector({selectedValues, setSelectedValues, data}) {
  const {colors} = useTheme();

  const toggleValue = value => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <View>
      {data.map(item => (
        <Pressable
          key={item.value}
          onPress={() => toggleValue(item.value)}
          className="flex-row items-center mb-2">
          <Checkbox
            status={selectedValues.includes(item.value) ? 'checked' : 'unchecked'}
          />
          <Text
            className="ml-2 font-regular"
            style={{color: colors.text_primary}}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
