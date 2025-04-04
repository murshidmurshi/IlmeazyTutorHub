import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {useTheme} from 'react-native-paper';

export default function CountryPickerModal({onSelect,visible, setVisible,}) {
  let {colors} = useTheme();
  return (
    <>
      <CountryPicker
        containerButtonStyle={{backgroundColor: 'black'}}
        withCountryNameButton={false} // ✅ Boolean should not be a string
        withFlag={true}
        withEmoji={true}
        withFilter={true}
        withAlphaFilter={true}
        withCallingCode={true}
        visible={visible}
        translation="common"
        withModal={true}
        theme={{
          fontFamily: 'Poppins-Regular', // ✅ Custom font applied inside modal
          backgroundColor: colors?.background_neutral,
          filterPlaceholderTextColor: colors.text_secondary,
          onBackgroundTextColor: colors.text_secondary,
        }}
        onSelect={onSelect} // ✅ Ensure this function exists to handle country selection
        onClose={() => setVisible(false)} // Close when clicking outside
      />
    </>
  );
}

const styles = StyleSheet.create({});
