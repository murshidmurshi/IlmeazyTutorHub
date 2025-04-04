import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Portal, Text, TextInput, useTheme} from 'react-native-paper';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import InputField from '../Input/InputField';
import PrimaryButton from '../button/PrimaryButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Iconicon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function Loginsheet({sheetRef}) {
  const formikRef = useRef(null); // Create a ref for Formik instance
  const {t} = useTranslation();
  const {colors} = useTheme();
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

  const [showPass, setShowPass] = useState(false);
  // Form Validation Schema
  const validateScheme = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const onSubmit = async values => {
    console.log(values, 'values');
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
          <View className="mx-3 flex-column  space-y-3.5">
            <Formik
              innerRef={formikRef} // Assign ref to Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validateScheme}
              onSubmit={onSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  {/* inputs */}
                  <View className="flex-column  space-y-2.5   mb-2">
                    <InputField
                      placeholder={emailInput}
                      label={emailInput}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors?.email}
                      touched={touched.email}
                    />
                    <InputField
                      placeholder={passwordinput}
                      label={passwordinput}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors?.password}
                      touched={touched.password}
                      secureTextEntry={showPass}
                      righticon={
                        <TextInput.Icon
                          onPress={() => setShowPass(!showPass)}
                          icon={() => (
                            <Iconicon
                              name={showPass ? 'eye-off-outline' : 'eye'}
                              size={24}
                              color={colors.iconColor}
                            />
                          )}
                        />
                      }
                    />
                  </View>
                </>
              )}
            </Formik>

            {/*  Login Btn */}
            <View>
              <PrimaryButton
                label={loginBtn}
                onPress={() => formikRef.current?.handleSubmit()}
              />
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
