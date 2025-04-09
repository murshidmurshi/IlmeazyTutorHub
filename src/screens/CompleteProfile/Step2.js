import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {isPlatformIOS} from '../../../utils/global';
import {TextInput, useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import AppHeader from '../../components/appHeader/AppHeader';
import {useTranslation} from 'react-i18next';
import TouchableInput from '../../components/Input/TouchableInput';
import InputField from '../../components/Input/InputField';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import OptionSheet from '../../components/sheet/OptionSheet';
import CountryPickerModal from '../../components/modal/CountryPickerModal';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function Step2() {
  const formikRef = useRef(null); // Create a ref for Formik instance
  const formik = formikRef.current;

  let {colors} = useTheme();
  let navigation = useNavigation();
  let {t} = useTranslation();
  // Extract Step2 translations

  const [
    screenName,
    subtitle,
    header1,
    mazhabPlaceholder,
    genderPlaceholder,
    header2,
    countryPlaceholder,
    statePlaceholder,
    cityPlaceholder,
    placePlaceholder,
    header3,
    bioPlaceholder,
    stepBtn,
  ] = [
    t('Steps.screenName'),
    t('Steps.Step2.subtitle'),
    t('Steps.Step2.header1'),
    t('Steps.Step2.mazhabDropdown.placeholder'),
    t('Steps.Step2.genderDropdown.placeholder'),
    t('Steps.Step2.header2'),
    t('Steps.Step2.countryDropdown.placeholder'),
    t('Steps.Step2.stateDropdown.placeholder'),
    t('Steps.Step2.cityDropdown.placeholder'),
    t('Steps.Step2.Place_placeholder'),
    t('Steps.Step2.header3'),
    t('Steps.Step2.bioPlaceholder'),
    t('Steps.stepBtn'),
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setselectedData] = useState([]);
  console.log(selectedData, 'selectedData');

  const sheetRef = useRef(null);
  const [country, setCountry] = useState(null);
  const [visible, setVisible] = useState(false);
  const onSelect = selectedCountry => {
    let countryName = selectedCountry?.name;
    if (countryName) {
      formik.setFieldValue('country', countryName);
      setCountry(selectedCountry);
      setVisible(false);
    }
  };

  const mazhabOptions = {
    title: 'Select Mazhab',
    key: 'mazhab',
    data: [
      {label: 'Shafi', value: 'shafi'},
      {label: 'Hanafi', value: 'hanafi'},
      {label: 'Hanbali', value: 'hanbali'},
      {label: 'Maliki', value: 'maliki'},
    ],
  };

  const genderOptions = {
    title: 'Select Gender',
    key: 'gender',
    data: [
      {label: 'Male', value: 'male'},
      {label: 'Female', value: 'female'},
    ],
  };

  const stateOptions = {
    title: 'Select State',
    key: 'state',
    data: [
      {label: 'Karnataka', value: 'karnataka'},
      {label: 'Maharashtra', value: 'maharashtra'},
      {label: 'Uttar Pradesh', value: 'uttar_pradesh'},
      {label: 'Tamil Nadu', value: 'tamil_nadu'},
      {label: 'West Bengal', value: 'west_bengal'},
    ],
  };

  const cityOptions = {
    title: 'Select City',
    key: 'city',
    data: [
      {label: 'Bangalore', value: 'bangalore'},
      {label: 'Mumbai', value: 'mumbai'},
      {label: 'Chennai', value: 'chennai'},
      {label: 'Delhi', value: 'delhi'},
      {label: 'Kolkata', value: 'kolkata'},
    ],
  };

  const handleInputPress = type => {
    // Set the selected option dynamically
    if (type === 'mazhab') {
      setSelectedOption(mazhabOptions);
    } else if (type === 'gender') {
      setSelectedOption(genderOptions);
    } else if (type === 'state') {
      setSelectedOption(stateOptions);
    } else if (type === 'city') {
      setSelectedOption(cityOptions);
    } else if (type === 'country') {
      setVisible(true);
      return;
    }
    // Open the bottom sheet
    sheetRef.current?.expand();
  };
  const handleNavigate = async () => {};

  const validationSchema = Yup.object().shape({
    mazhab: Yup.string().required('Mazhab is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    place: Yup.string().required('Place is required'),
    bio: Yup.string()
      .min(10, 'Bio must be at least 10 characters')
      .required('Bio is required'),
  });
  const onSubmit = async values => {
    console.log(values, 'values');
    navigation.navigate('Step3');
  };

  return (
    <>
      <AppHeader screenName={screenName} secondTitle={subtitle} />

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
                <Formik
                  innerRef={formikRef}
                  initialValues={{
                    mazhab: '',
                    gender: '',
                    country: '',
                    state: '',
                    city: '',
                    place: '',
                    bio: '',
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
                      <View className="p-3 py-2 pb-4  flex-column ">
                        {/* input for dropDown1 for selecting Mazhab  */}
                        <TouchableInput
                          label={mazhabPlaceholder}
                          onPress={() => handleInputPress('mazhab')}
                          value={values?.mazhab}
                          onChangeText={handleChange('mazhab')}
                          onBlur={handleBlur('mazhab')}
                          error={errors?.mazhab}
                          touched={touched.mazhab}
                        />

                        {/* input for dropDown1 for selecting Gender  */}
                        <TouchableInput
                          label={genderPlaceholder}
                          onPress={() => handleInputPress('gender')}
                          value={values?.gender}
                          onChangeText={handleChange('gender')}
                          onBlur={handleBlur('gender')}
                          error={errors?.gender}
                          touched={touched.gender}
                        />
                      </View>

                      <InputHeader label={header2} />
                      <View className="p-3 py-2 pb-4  flex-column ">
                        {/* input for dropDown1 for selecting country  */}
                        <TouchableInput
                          label={countryPlaceholder}
                          onPress={() => handleInputPress('country')}
                          value={values?.country}
                          onChangeText={handleChange('country')}
                          onBlur={handleBlur('country')}
                          error={errors?.country}
                          touched={touched.country}
                        />

                        {/* input for dropDown1 for selecting state  */}
                        <TouchableInput
                          label={statePlaceholder}
                          onPress={() => handleInputPress('state')}
                          value={values?.state}
                          onChangeText={handleChange('state')}
                          onBlur={handleBlur('state')}
                          error={errors?.state}
                          touched={touched.state}

                          // value={mazhabCategory1}
                        />
                        {/* input for dropDown1 for selecting city  */}
                        <TouchableInput
                          label={cityPlaceholder}
                          onPress={() => handleInputPress('city')}
                          value={values?.city}
                          onChangeText={handleChange('city')}
                          onBlur={handleBlur('city')}
                          error={errors?.city}
                          touched={touched.city}

                          // value={mazhabCategory1}
                        />
                        <InputField
                          label={placePlaceholder}
                          value={values?.place}
                          onChangeText={handleChange('place')}
                          onBlur={handleBlur('place')}
                          error={errors?.place}
                          touched={touched.place}
                        />
                      </View>

                      <InputHeader label={header3} />
                      <View className="p-3 py-2 pb-4  flex-column ">
                        <InputField
                          label={bioPlaceholder}
                          value={values?.bio}
                          onChangeText={handleChange('bio')}
                          onBlur={handleBlur('bio')}
                          error={errors?.bio}
                          touched={touched.bio}
                        />
                      </View>
                    </View>
                  )}
                </Formik>
              </ScrollView>
              <View
                className="p-4 pt-1 shadow-xl  "
                style={{
                  backgroundColor: colors.background_default,
                }}>
                <PrimaryButton
                  label={stepBtn}
                  onPress={() => formikRef.current?.handleSubmit()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <OptionSheet
        sheetRef={sheetRef}
        data={selectedOption}
        setselectedData={setselectedData}
        selectedData={selectedData}
        formik={formik}
      />
      {visible && (
        <CountryPickerModal
          visible={visible}
          setVisible={setVisible}
          onSelect={onSelect}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
