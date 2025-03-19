import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Text, useTheme} from 'react-native-paper';
import Loginsheet from '../../components/sheet/LoginSheet';

export default function Login() {
  let {colors} = useTheme();
  const sheetRef = useRef(null);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''} // Adjust behavior for iOS
        style={{backgroundColor: colors.background_default}}
        className="flex-1 justify-center">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{backgroundColor: colors.primary_main}}
            className="flex-1 ">
            <Loginsheet sheetRef={sheetRef} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
