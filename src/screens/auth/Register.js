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
import React, {useEffect, useRef, useState} from 'react';
import AppHeader from '../../components/appHeader/AppHeader';
import {Checkbox, TextInput, useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import InputField from '../../components/Input/InputField';
import Iconicon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../../components/button/PrimaryButton';
import {isPlatformIOS} from '../../../utils/global';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CountryPickerModal from '../../components/modal/CountryPickerModal';
import DatePickerComponent from '../../components/modal/DatePickerModal';
import moment from 'moment';

export default function Register() {
  const formikRef = useRef(null); // Create a ref for Formik instance
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

  const [countryContact, setCountryContact] = useState('+91');
  const [countryWhatsapp, setCountryWhatsapp] = useState('+91');
  const [currentField, setCurrentField] = useState(null); // <- NEW
  const [visible, setVisible] = useState(false);

  const onSelect = selectedCountry => {
    let countryCode = selectedCountry?.dial_code;
    if (currentField === 'contact') {
      setCountryContact(countryCode);
    } else if (currentField === 'whatsapp_number') {
      setCountryWhatsapp(countryCode);
    }

    setVisible(false);
    setCurrentField(null); // reset
  };

  const handleCountryPicker = field => {
    setCurrentField(field); // 'contact' or 'whatsapp'
    setVisible(true);
  };

  // const handleRegister = () => {
  //   navigation.navigate('Parent');
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    contact: Yup.string()
      .matches(
        /^\d{8,12}$/, // Allows only digits, 8 to 12 characters long
        'Enter a valid contact number (8-12 digits only)',
      )
      .required('Contact is required'),
    whatsapp_number: Yup.string().matches(
      /^\d{8,12}$/, // Allows only digits, 8 to 12 characters long
      'Enter a valid contact number (8-12 digits only)',
      // .required('Whatsapp number is required'),
    ),
    dob: Yup.date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .required('Date of Birth is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });
  const onSubmit = async values => {
    console.log(values, 'values');
    navigation.navigate('Parent');
  };

  // checkbox
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  // Date
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formik = formikRef.current;

  const MakeitSame = () => {
    const newValue = !checkbox1;
    setCheckbox1(newValue);
    if (formik) {
      if (newValue) {
        // Checkbox checked: copy contact and country
        const contact = formik.values.contact;
        formik.setFieldValue('whatsapp_number', contact);
        setCountryWhatsapp(countryContact);
      } else {
        // Checkbox unchecked: clear WhatsApp & set default code (+91)
        formik.setFieldValue('whatsapp_number', '');
        setCountryWhatsapp('91');
      }
    }
  };
  const formattedDate = moment(date).format('DD MMM YYYY');
  console.log(formattedDate, 'formattedDate');

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  useEffect(() => {
    if (formik) {
      if (date) {
        formik.setFieldValue('dob', date);
      } else {
        // Checkbox unchecked: clear WhatsApp & set default code (+91)
        formik.setFieldValue('dob', '');
      }
    }
  }, [date]);

  return (
    <>
      <AppHeader screenName={screenName} />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={isPlatformIOS ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 ">
              <ScrollView
                contentContainerStyle={{flexGrow: 1}} // Ensures scrollability
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: colors.background_default}}>
                <Formik
                  innerRef={formikRef}
                  initialValues={{
                    name: '',
                    email: '',
                    contact: '',
                    whatsapp_number: '',
                    dob: '',
                    password: '',
                    confirm_password: '',
                  }}
                  // validationSchema={validationSchema}
                  onSubmit={onSubmit}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                  }) => (
                    <View className="flex-1">
                      {/* header 1 */}
                      <InputHeader label={header1} />

                      {/* first container */}
                      <View className="p-3 py-2 pb-4">
                        <InputField
                          label={nameinput}
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          error={errors?.name}
                          touched={touched.name}
                        />
                        <InputField
                          label={emailinput}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          error={errors?.email}
                          touched={touched.email}
                        />

                        {/* Contact Number input */}
                        <View className="flex-row space-x-3">
                          <View>
                            <InputField
                              label={`${countryContact}`}
                              onPress={() => handleCountryPicker('contact')}
                            />
                          </View>
                          <View className="flex-1">
                            <InputField
                              label={contactinput}
                              value={values.contact}
                              onChangeText={handleChange('contact')}
                              onBlur={handleBlur('contact')}
                              error={errors?.contact}
                              touched={touched.contact}
                            />
                          </View>
                        </View>

                        {/* whatsapp Number input */}
                        <View className="flex-row space-x-3">
                          <View>
                            <InputField
                              label={`${countryWhatsapp}`}
                              onPress={() =>
                                handleCountryPicker('whatsapp_number')
                              }
                            />
                          </View>
                          <View className="flex-1">
                            <InputField
                              label={whatsappinput}
                              value={values.whatsapp_number}
                              onChangeText={handleChange('whatsapp_number')}
                              onBlur={handleBlur('whatsapp_number')}
                              error={errors?.whatsapp_number}
                              touched={touched.whatsapp_number}
                            />
                          </View>
                        </View>

                        {/* first checkbox */}
                        <View className="flex-row space-x-1 items-center my-0.5">
                          <Checkbox.Android
                            status={checkbox1 ? 'checked' : 'unchecked'}
                            onPress={MakeitSame}
                          />
                          <Text
                            className="font-regular text-sm"
                            style={{color: colors.text_disabled}}>
                            {first_checkbox}
                          </Text>
                        </View>

                        {/* DOB */}
                        <InputField
                          disabled={true}
                          label={dobinput}
                          value={formattedDate}
                          onChangeText={handleChange('dob')}
                          onBlur={handleBlur('dob')}
                          error={errors?.dob}
                          touched={touched.dob}
                          righticon={
                            <TextInput.Icon
                              onPress={() => setOpen(true)}
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
                      <View className="p-3 py-2 pb-4">
                        <InputField
                          label={passwordinput}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          error={errors?.password}
                          touched={touched.password}
                          secureTextEntry={showPass1}
                          righticon={
                            <TextInput.Icon
                              onPress={() => setShowPass1(!showPass1)}
                              icon={() => (
                                <Iconicon
                                  name={showPass1 ? 'eye-off-outline' : 'eye'}
                                  size={24}
                                  color={colors.iconColor}
                                />
                              )}
                            />
                          }
                        />

                        <InputField
                          label={confirm_pass}
                          value={values.confirm_password}
                          onChangeText={handleChange('confirm_password')}
                          onBlur={handleBlur('confirm_password')}
                          error={errors?.confirm_password}
                          touched={touched.confirm_password}
                          secureTextEntry={showPass2}
                          righticon={
                            <TextInput.Icon
                              onPress={() => setShowPass2(!showPass2)}
                              icon={() => (
                                <Iconicon
                                  name={showPass2 ? 'eye-off-outline' : 'eye'}
                                  size={24}
                                  color={colors.iconColor}
                                />
                              )}
                            />
                          }
                        />
                      </View>
                    </View>
                  )}
                </Formik>
              </ScrollView>

              {/* Fixed Bottom Button */}
              <View
                className="p-4 pt-1 shadow-xl flex-1"
                style={{
                  backgroundColor: colors.background_default,
                }}>
                {/* Second checkbox */}
                <View className="flex-row space-x-1 items-center mb-1">
                  <Checkbox.Android
                    status={checkbox2 ? 'checked' : 'unchecked'}
                    onPress={() => setCheckbox2(!checkbox2)}
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
                <PrimaryButton
                  label={regBtn}
                  onPress={() => formikRef.current?.handleSubmit()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {visible && (
        <CountryPickerModal
          visible={visible}
          setVisible={setVisible}
          onSelect={onSelect}
        />
      )}

      {open && (
        <DatePickerComponent
          open={open}
          setOpen={setOpen}
          date={date}
          setDate={setDate}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({});
