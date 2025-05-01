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
import PrimaryButton from '../../components/button/PrimaryButton';
import TimeSlots from '../../components/Input/TimeSlots';
import OptionSheet from '../../components/sheet/OptionSheet';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function Step4() {
  const formikRef = useRef(null); // Create a ref for Formik instance
  const formik = formikRef.current;
  let {colors} = useTheme();
  let navigation = useNavigation();
  let {t} = useTranslation();
  // Extract Step3 translations

  const [
    screenName,
    subtitle,
    header1,
    tutorTypePlaceholder,
    teachingLanguagePlaceholder,
    coursePlaceholder,
    header2,
    stepBtn,
  ] = [
    t('Steps.screenName'),
    t('Steps.Step4.subtitle'),
    t('Steps.Step4.header1'),
    t('Steps.Step4.T_typeDropdown.placeholder'),
    t('Steps.Step4.teaching_lan_Dropdown.placeholder'),
    t('Steps.Step4.courseDropdown.placeholder'),
    t('Steps.Step4.header2'),
    t('Steps.stepBtn'),
  ];

  const extractCategories = path => {
    const data = t(path, {returnObjects: true}); // Ensure we get the full object
    if (!data || typeof data !== 'object') return []; // Handle cases where data is missing
    return Object.keys(data)
      .filter(key => key.startsWith('category')) // Filter category keys
      .map(key => data[key]); // Extract values
  };

  // Fetch categories dynamically
  const sessionCategories = extractCategories(
    'Steps.Step4.slotCategory.sesson',
  );
  const durationCategories = extractCategories(
    'Steps.Step4.slotCategory.duration',
  );
  const timeslotCategories = extractCategories(
    'Steps.Step4.slotCategory.timeslot',
  );

  const sessiondata = {
    title: t('Steps.Step4.slotCategory.sesson.title'),
    categories: sessionCategories,
  };
  const durationdata = {
    title: t('Steps.Step4.slotCategory.duration.title'),
    categories: durationCategories,
  };

  const timeslotdata = {
    title: t('Steps.Step4.slotCategory.timeslot.title'),
    categories: timeslotCategories,
  };
  const [selected, setSelected] = useState({
    Sesson: sessionCategories[0],
    Duration: durationCategories[1],
    Timeslot: timeslotCategories[0],
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setselectedData] = useState([]);
  console.log(selectedData, 'selectedData');

  const sheetRef = useRef(null);
  const tutorType_option = {
    title: 'Select Tutor Type',
    key: 'tutorType',
    data: [
      {label: 'School Teacher', value: 'school_teacher'},
      {label: 'Madrasa Teacher', value: 'madrasa_teacher'},
      {label: 'University Professor', value: 'university_professor'},
      {label: 'Private Tutor', value: 'private_tutor'},
      {label: 'Hafiz (Quran Teacher)', value: 'hafiz'},
      {label: 'Islamic Scholar', value: 'islamic_scholar'},
      {label: 'Online Tutor', value: 'online_tutor'},
      {label: 'Part-Time Tutor', value: 'part_time_tutor'},
      {label: 'Full-Time Tutor', value: 'full_time_tutor'},
    ],
  };

  const teachingLang_option = {
    title: 'Select Teaching Language',
    key: 'teachingLang',
    multiple: 'yes',
    data: [
      {label: 'Arabic', value: 'arabic'},
      {label: 'Urdu', value: 'urdu'},
      {label: 'English', value: 'english'},
      {label: 'Hindi', value: 'hindi'},
      {label: 'Bengali', value: 'bengali'},
      {label: 'Turkish', value: 'turkish'},
      {label: 'Persian', value: 'persian'},
      {label: 'French', value: 'french'},
      {label: 'Malayalam', value: 'malayalam'},
      {label: 'Tamil', value: 'tamil'},
    ],
  };

  const course_option = {
    title: 'Select Course',
    key: 'course',
    data: [
      {label: 'Tajweed & Quran Recitation', value: 'tajweed_quran'},
      {label: 'Hifz (Quran Memorization)', value: 'hifz'},
      {label: 'Islamic Studies', value: 'islamic_studies'},
      {label: 'Hadith Studies', value: 'hadith_studies'},
      {label: 'Fiqh (Islamic Jurisprudence)', value: 'fiqh'},
      {label: 'Aqidah (Islamic Theology)', value: 'aqidah'},
      {label: 'Seerah (Prophet’s Biography)', value: 'seerah'},
      {label: 'Arabic Grammar & Language', value: 'arabic_grammar'},
      {label: 'Islamic History', value: 'islamic_history'},
      {label: 'Modern Islamic Research', value: 'modern_islamic_research'},
    ],
  };

  const handleInputPress = type => {
    // Set the selected option dynamically
    if (type === 'tutorType') {
      setSelectedOption(tutorType_option);
    } else if (type === 'teachingLang') {
      setSelectedOption(teachingLang_option);
    } else if (type === 'course') {
      setSelectedOption(course_option);
    }
    // Open the bottom sheet
    sheetRef.current?.expand();
  };

  const onSubmit = async values => {
    console.log(values, 'values');
    console.log(selected, 'selected');
    navigation.navigate('Step5');
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
                    tutorType: '',
                    teachingLang: null,
                    course: '',
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
                        {/* input for dropDown1 for selecting Type of Tutor  */}
                        <TouchableInput
                          label={tutorTypePlaceholder}
                          onPress={() => handleInputPress('tutorType')}
                          value={values?.tutorType}
                          onChangeText={handleChange('tutorType')}
                          onBlur={handleBlur('tutorType')}
                          error={errors?.tutorType}
                          touched={touched.tutorType}
                        />
                        {/* input for dropDown2 for selecting tutur teaching lang */}
                        <TouchableInput
                          label={teachingLanguagePlaceholder}
                          onPress={() => handleInputPress('teachingLang')}
                          // value={values?.teachingLang}
                          onChangeText={handleChange('teachingLang')}
                          onBlur={handleBlur('teachingLang')}
                          error={errors?.teachingLang}
                          touched={touched.teachingLang}
                        />

                        <View className="flex-row flex-wrap gap-2 mb-3 ">
                          {Array.isArray(
                            selectedData.find(
                              item => item.type === 'teachingLang',
                            )?.value,
                          ) &&
                            selectedData
                              .find(item => item.type === 'teachingLang')
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

                        {/* input for dropDown3 for selecting course */}
                        <TouchableInput
                          label={coursePlaceholder}
                          onPress={() => handleInputPress('course')}
                          value={values?.course}
                          onChangeText={handleChange('course')}
                          onBlur={handleBlur('course')}
                          error={errors?.course}
                          touched={touched.course}
                        />
                      </View>

                      <InputHeader label={header2} />
                      <TimeSlots
                        data={sessiondata}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <TimeSlots
                        data={durationdata}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <TimeSlots
                        data={timeslotdata}
                        selected={selected}
                        setSelected={setSelected}
                      />
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
