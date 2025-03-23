import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/appHeader/AppHeader';
import {Checkbox, TextInput, useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import InputField from '../../components/Input/InputField';
import Iconicon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/button/PrimaryButton';
import {isPlatformIOS} from '../../../utils/global';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

export default function Register() {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const {t} = useTranslation();
  // Extract Register Content
  const {
    screenName,
    header1,
    nameinput,
    emailinput,
    passwordinput,
    contactinput,
    whatsappinput,
    first_checkbox,
    dobinput,
    header2,
    confirm_pass,
    second_checkbox,
    second_checkbox_underline,
    regBtn,
  } = {
    screenName: t('Register.screenName'),
    header1: t('Register.header1'),
    nameinput: t('Register.nameinput'),
    emailinput: t('Register.emailinput'),
    contactinput: t('Register.contactinput'),
    whatsappinput: t('Register.whatsappinput'),
    first_checkbox: t('Register.first_checkbox'),
    dobinput: t('Register.dobinput'),
    header2: t('Register.header2'),
    passwordinput: t('Register.passwordinput'),
    confirm_pass: t('Register.confirm_pass'),
    second_checkbox: t('Register.second_checkbox'),
    second_checkbox_underline: t('Register.second_checkbox_underline'),
    regBtn: t('Register.regBtn'),
  };

  const [checked, setChecked] = useState(false);
  const handleRegister = () => {
    navigation.navigate('Parent');
  };
  return (
    <>
      <AppHeader screenName={screenName} />
      <KeyboardAvoidingView
        behavior={isPlatformIOS ? 'padding' : 'height'} // Adjust behavior for iOS
        className="flex-1 justify-center "
        keyboardVerticalOffset={5} // Adjust this value as needed
      >
        <SafeAreaView className="flex-1 justify-center">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 ">
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{backgroundColor: colors.background_default}}
                className="flex-1 pb-4">
                {/* header 1 */}
                <InputHeader label={header1} />
                {/* first container */}
                <View className="p-3 py-2 pb-4  flex-column ">
                  <InputField label={nameinput} />
                  <InputField label={emailinput} />

                  {/* Contact Number input */}
                  <View className="flex-row space-x-3">
                    <View>
                      <InputField label={'+91'} />
                    </View>
                    <View className="flex-1">
                      <InputField label={contactinput} />
                    </View>
                  </View>

                  {/* whatsapp Number input */}
                  <View className="flex-row space-x-3">
                    <View>
                      <InputField label={'+91'} />
                    </View>
                    <View className="flex-1">
                      <InputField label={whatsappinput} />
                    </View>
                  </View>

                  {/* first checkbox */}
                  <View className="flex-row space-x-1 items-center my-0.5">
                    <Checkbox.Android
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                    <Text
                      className="font-regular  text-sm"
                      style={{color: colors.text_disabled}}>
                      {first_checkbox}
                    </Text>
                  </View>

                  {/* DOB */}
                  <InputField
                    label={dobinput}
                    righticon={
                      <TextInput.Icon
                        icon={() => (
                          <Iconicon
                            name="calendar"
                            size={24}
                            color={colors.iconColor}
                          />
                        )}
                      />
                    }
                  />
                </View>

                {/* header 2 */}
                <InputHeader label={header2} />

                {/* second container */}
                <View className="p-3 py-2 pb-4  flex-column ">
                  <InputField
                    label={passwordinput}
                    righticon={
                      <TextInput.Icon
                        icon={() => (
                          <Iconicon
                            name="eye"
                            size={24}
                            color={colors.iconColor}
                          />
                        )}
                      />
                    }
                  />

                  <InputField
                    label={confirm_pass}
                    righticon={
                      <TextInput.Icon
                        icon={() => (
                          <Iconicon
                            name="eye"
                            size={24}
                            color={colors.iconColor}
                          />
                        )}
                      />
                    }
                  />
                </View>
              </ScrollView>
              {/* Fixed Bottom Button */}
              <View className="absolute bottom-2 left-0 right-0 p-4 shadow-xl">
                {/* Second checkbox */}
                <View className="flex-row space-x-1 items-center mb-2">
                  <Checkbox.Android
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                  />

                  <View className="flex-row ">
                    <Text
                      className="font-regular text-sm"
                      style={{color: colors.text_disabled}}>
                      {second_checkbox}
                    </Text>
                    <Text
                      className="font-regular text-sm underline"
                      style={{color: colors.text_disabled}}>
                      {second_checkbox_underline}
                    </Text>
                  </View>
                </View>
                <PrimaryButton label={regBtn} onPress={handleRegister} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
