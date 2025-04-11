import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
// import CountryPicker from 'react-native-country-picker-modal';
import {CountryPicker} from 'react-native-country-codes-picker';

import {Text, useTheme} from 'react-native-paper';
import {Wheight, Wwidth} from '../../../utils/global';

export default function CountryPickerModal({onSelect, visible, setVisible}) {
  let {colors} = useTheme();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  return (
    <>
      <CountryPicker
        inputPlaceholder="Search here .."
        show={visible}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          console.log(item,'item');
          onSelect(item)
          setVisible(false);
        }}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: Wheight - 200,
            backgroundColor: colors.background_paper,
          },
          // Styles for input [TextInput]
          textInput: {
            height: 55,
            borderRadius: 12,
            paddingHorizontal: 10,
            fontFamily: 'Poppins-Regular',
          },
          // Styles for country button [TouchableOpacity]
          countryButtonStyles: {
            height: 60,
            borderRadius: 20,
          },
          // Styles for search message [Text]
          searchMessageText: {
            fontFamily: 'Poppins-Regular',
          },
          // Flag styles [Text]
          flag: {
            height: 20,
          },
          // Dial code styles [Text]
          dialCode: {
            fontFamily: 'Poppins-Regular',
          },
          // Country name styles [Text]
          countryName: {
            fontFamily: 'Poppins-Regular',
          },
        }}
      />

      {/* <CountryPicker
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
      /> */}
    </>
  );
}

const styles = StyleSheet.create({});
