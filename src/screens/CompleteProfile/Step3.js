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
import React, {useRef, useState} from 'react';
import {isPlatformIOS} from '../../../utils/global';
import {useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import AppHeader from '../../components/appHeader/AppHeader';
import {useTranslation} from 'react-i18next';
import TouchableInput from '../../components/Input/TouchableInput';
import InputField from '../../components/Input/InputField';
import PrimaryButton from '../../components/button/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import OptionSheet from '../../components/sheet/OptionSheet';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function Step3() {
  const formikRef = useRef(null); // Create a ref for Formik instance
  const formik = formikRef.current;
  let {colors} = useTheme();
  let {t} = useTranslation();
  // Extract Step3 translations

  const [
    screenName,
    subtitle,
    header1,
    generalQualificationPlaceholder,
    islamicQualificationPlaceholder,
    header2,
    year,
    months,
    header3,
    languagePlaceholder,
    stepBtn,
  ] = [
    t('Steps.screenName'),
    t('Steps.Step3.subtitle'),
    t('Steps.Step3.header1'),
    t('Steps.Step3.GeducationDropdown.placeholder'),
    t('Steps.Step3.IeducationDropdown.placeholder'),
    t('Steps.Step3.header2'),
    t('Steps.Step3.year'),
    t('Steps.Step3.months'),
    t('Steps.Step3.header3'),
    t('Steps.Step3.langDropdown.placeholder'),
    t('Steps.stepBtn'),
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedData, setselectedData] = useState([]);
  const sheetRef = useRef(null);
  let navigation = useNavigation();
  const generalE_option = {
    title: 'Select General Education',
    key: 'generalQualification',
    data: [
      {label: 'No Formal Education', value: 'no_education'},
      {label: 'Primary School', value: 'primary'},
      {label: 'Middle School', value: 'middle_school'},
      {label: 'High School', value: 'high_school'},
      {label: 'Vocational Training', value: 'vocational'},
      {label: 'Technical Certification', value: 'technical'},
      {label: 'Adult Education', value: 'adult_education'},
      {label: 'Online Course Certification', value: 'online_certification'},
    ],
  };

  const islamicE_option = {
    title: 'Select Islamic Qualification',
    key: 'islamicQualification',
    data: [
      {label: 'No Formal Islamic Education', value: 'no_islamic_education'},
      {label: 'Basic Madrasa Education', value: 'basic_madrasa'},
      {label: 'Hifz-ul-Quran (Hafiz)', value: 'hifz'},
      {label: 'Tajweed & Qiraat Certification', value: 'tajweed_qiraat'},
      {label: 'Mufti (Islamic Jurisprudence)', value: 'mufti'},
      {label: 'Islamic University Degree', value: 'islamic_university'},
      {label: 'Dawah & Islamic Studies', value: 'dawah_studies'},
      {label: 'Shariah & Fiqh Studies', value: 'shariah_fiqh'},
    ],
  };

  const languagesKnown_option = {
    title: 'Select Languages Known',
    key: 'langKnown',
    multiple: 'yes',
    data: [
      {label: 'Arabic', value: 'arabic'},
      {label: 'English', value: 'english'},
      {label: 'Urdu', value: 'urdu'},
      {label: 'Hindi', value: 'hindi'},
      {label: 'Bengali', value: 'bengali'},
      {label: 'Persian (Farsi)', value: 'persian'},
      {label: 'Pashto', value: 'pashto'},
      {label: 'Turkish', value: 'turkish'},
      {label: 'Malayalam', value: 'malayalam'},
      {label: 'Tamil', value: 'tamil'},
      {label: 'Punjabi', value: 'punjabi'},
      {label: 'French', value: 'french'},
      {label: 'Spanish', value: 'spanish'},
      {label: 'German', value: 'german'},
      {label: 'Chinese (Mandarin)', value: 'chinese'},
    ],
  };

  const validationSchema = Yup.object().shape({
    generalQualification: Yup.string().required(
      'General Qualification is rquired',
    ),
    islamicQualification: Yup.string().required(
      'Islamic Qualification is required',
    ),
    teachingExperience: Yup.object().shape({
      year: Yup.number()
        .typeError('Year must be a number')
        .min(0, 'Year connot be negative')
        .required('Year is required'),
      months: Yup.number()
        .typeError('Months must be a number')
        .min(0, 'Months cannot be negative')
        .max(11, 'Months must be less than 12')
        .required('Months are required'),
    }),
    langKnown: Yup.array().min(1, 'Select at least one language'),
  });

  const handleInputPress = type => {
    // Set the selected option dynamically
    if (type === 'generalQualification') {
      setSelectedOption(generalE_option);
    } else if (type === 'islamicQualification') {
      setSelectedOption(islamicE_option);
    } else if (type === 'langKnown') {
      setSelectedOption(languagesKnown_option);
    }
    // Open the bottom sheet
    sheetRef.current?.expand();
  };

  const onSubmit = async values => {
    navigation.navigate('Step4');
  };

  let initialValues = {
    generalQualification: '',
    islamicQualification: '',
    teachingExperience: {
      year: '',
      months: '',
    },
    langKnown: [],
  };
  return (
    <>
      <AppHeader screenName={screenName} secondTitle={subtitle} />

      <KeyboardAvoidingView
        behavior={isPlatformIOS ? 'padding' : 'height'} // Adjust behavior for iOS
        className="flex-1 justify-center "
        keyboardVerticalOffset={5} // Adjust this value as needed
        style={{backgroundColor: colors.background_default}}>
        <SafeAreaView className="flex-1 justify-center">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 ">
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                className="flex-1 pb-4">
                <Formik
                  innerRef={formikRef}
                  initialValues={initialValues}
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
                        {/* input for dropDown1 for selecting General education  */}
                        <TouchableInput
                          label={generalQualificationPlaceholder}
                          onPress={() =>
                            handleInputPress('generalQualification')
                          }
                          value={values?.generalQualification}
                          onChangeText={handleChange('generalQualification')}
                          onBlur={handleBlur('generalQualification')}
                          error={errors?.generalQualification}
                          touched={touched.generalQualification}
                        />

                        {/* input for dropDown2 for selecting Islamic education  */}
                        <TouchableInput
                          label={islamicQualificationPlaceholder}
                          onPress={() =>
                            handleInputPress('islamicQualification')
                          }
                          value={values?.islamicQualification}
                          onChangeText={handleChange('islamicQualification')}
                          onBlur={handleBlur('islamicQualification')}
                          error={errors?.islamicQualification}
                          touched={touched.islamicQualification}
                        />
                      </View>

                      <InputHeader label={header2} />
                      <View className="p-3 py-2 pb-4  flex-column ">
                        <View className="flex-row w-full space-x-5">
                          <View className="flex-1">
                            <InputField
                              label={year}
                              value={values?.teachingExperience?.year}
                              onChangeText={handleChange(
                                'teachingExperience.year',
                              )}
                              onBlur={handleBlur('teachingExperience.year')}
                              error={errors?.teachingExperience?.year}
                              touched={touched?.teachingExperience?.year}
                            />
                          </View>
                          <View className="flex-1">
                            <InputField
                              label={months}
                              value={values?.teachingExperience?.months}
                              onChangeText={handleChange(
                                'teachingExperience.months',
                              )}
                              onBlur={handleBlur('teachingExperience.months')}
                              error={errors?.teachingExperience?.months}
                              touched={touched?.teachingExperience?.months}
                            />
                          </View>
                        </View>
                      </View>

                      <InputHeader label={header3} />
                      <View className="p-3 py-2 pb-4  flex-column ">
                        {/* input for dropDown3 for selecting langknown */}
                        <TouchableInput
                          label={languagePlaceholder}
                          onPress={() => handleInputPress('langKnown')}
                          // value={values?.langKnown}
                          onChangeText={handleChange('langKnown')}
                          onBlur={handleBlur('langKnown')}
                          error={errors?.langKnown}
                          touched={errors?.langKnown}
                        />
                      </View>

                      <View className="flex-row flex-wrap gap-2 mx-2">
                        {selectedData.find(item => item.type === 'langKnown')
                          ?.value instanceof Array &&
                          selectedData
                            .find(item => item.type === 'langKnown')
                            ?.value.map((lang, idx) => (
                              <View
                                key={idx}
                                className="px-3 py-1 rounded-lg shadow-sm"
                                style={{
                                  backgroundColor: colors.background_neutral,
                                }}>
                                <Text
                                  className="font-regular text-sm"
                                  style={{color: colors.text_secondary}}>
                                  {lang}
                                </Text>
                              </View>
                            ))}
                      </View>
                    </View>
                  )}
                </Formik>
              </ScrollView>
              <View className="absolute bottom-2 left-0 right-0 p-4  shadow-xl">
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
    </>
  );
}

const styles = StyleSheet.create({});
