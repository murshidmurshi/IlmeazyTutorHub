import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, Button, I18nManager} from 'react-native';
import {Divider, Portal, Text, TextInput, useTheme} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import InputField from '../Input/InputField';
import PrimaryButton from '../button/PrimaryButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Iconicon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from '../../redux/slices/settingSlice';

export default function Loginsheet({sheetRef}) {
  const { t } = useTranslation();
const { colors } = useTheme();
const {
  greeting,
  loginchild,
  emailInput,
  passwordinput,
  loginBtn,
  forgot_pass,
  regQuestion,
  regchild,
  regBtn,
} = {
  greeting: t('Login.greeting'),
  loginchild: t('Login.loginchild'),
  emailInput: t('Login.emailInput'),
  passwordinput: t('Login.passwordinput'),
  loginBtn: t('Login.loginBtn'),
  forgot_pass: t('Login.forgot_pass'),
  regQuestion: t('Login.regQuestion'),
  regchild: t('Login.regchild'),
  regBtn: t('Login.regBtn'),
};

  const navigation = useNavigation();
  const snapPoints = ['75%'];
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
        // disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        sheetRef.current?.expand(); // Ensure ref is set before calling expand
      }, 200); // Small delay
    }, []),
  );

  const handleNavigate = async () => {
    await sheetRef.current?.close(); // Ensure ref is set before calling expand
    navigation.navigate('Register');
  };
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.setting);
  const SwitchLang = lang => {
    changeLanguage(dispatch, lang);
  };

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={0} // Initially closed
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{backgroundColor: colors.background_neutral}}
        backgroundStyle={{
          backgroundColor: colors.background_neutral,
          borderRadius: 25,
        }}>
        <BottomSheetScrollView>
          {/* <View>
            <Text>Current Language: {language}</Text>
            <Button title="Switch to Arabic" onPress={() => SwitchLang('ar')} />
            <Button
              title="Switch to English"
              onPress={() => SwitchLang('en')}
            />
            <Button
              title="Switch to Indonesian"
              onPress={() => SwitchLang('id')}
            />
          </View> */}

          {/* headercontent */}
          <View className="flex-column my-2 space-y-1 my-4">
            {/* greeting */}
            <Text className="font-semi text-center text-xl px-10">
              {greeting}
            </Text>
            {/* child content */}
            <Text className="font-f_light text-center text-sm">
              {loginchild}
            </Text>
          </View>
          {/* Main container */}
          <View className="mx-3 flex-column  space-y-3.5">
            {/* inputs */}
            <View className="flex-column  space-y-2.5   mb-2">
              <View>
                <InputField placeholder={emailInput} label={emailInput} />
              </View>
              <View>
                <InputField
                  placeholder={passwordinput}
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
              </View>
            </View>
            {/*  Login Btn */}
            <View>
              <PrimaryButton label={loginBtn} />
            </View>

            {/* forgot content */}

            <Text
              className="font-regular text-center text-sm"
              style={{color: colors.green}}>
              {forgot_pass}
            </Text>

            {/* Divider */}
            <View className="mx-7 py-2">
              {/* Adjust the spacing as needed */}
              <Divider
                style={{
                  borderBottomWidth: 1.5,
                  borderBottomColor: 'gray', // Customize color
                  borderStyle: 'dotted',
                  gap: 2,
                }}
              />
            </View>

            {/* Register */}

            <View className="flex-column space-y-1 mb-1 ">
              {/* greeting */}
              <Text className="font-semi text-center text-xl">
                {regQuestion}
              </Text>
              {/* child content */}
              <Text className="font-f_light text-center text-sm">
                {regchild}
              </Text>
            </View>

            {/*  Register Btn */}
            <View className="pb-10">
              <PrimaryButton
                label={regBtn}
                bg={false}
                onPress={handleNavigate}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({});
