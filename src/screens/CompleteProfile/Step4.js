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
import React from 'react';
import {isPlatformIOS} from '../../../utils/global';
import {useTheme} from 'react-native-paper';
import InputHeader from '../../components/Input/InputHeader';
import AppHeader from '../../components/appHeader/AppHeader';
import {useTranslation} from 'react-i18next';
import TouchableInput from '../../components/Input/TouchableInput';
import InputField from '../../components/Input/InputField';
import PrimaryButton from '../../components/button/PrimaryButton';
import TimeSlots from '../../components/Input/TimeSlots';

export default function Step4() {
  let {colors} = useTheme();
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
    sessionTitle,
    sessionMorning,
    sessionAfternoon,
    sessionEvening,
    durationTitle,
    duration30Min,
    duration1Hour,
    timeslotTitle,
    timeslot1,
    timeslot2,
    timeslot3,
    timeslot4,
    stepBtn,
  ] = [
    t('Steps.screenName'),
    t('Steps.Step4.subtitle'),
    t('Steps.Step4.header1'),
    t('Steps.Step4.T_typeDropdown.placeholder'),
    t('Steps.Step4.teaching_lan_Dropdown.placeholder'),
    t('Steps.Step4.courseDropdown.placeholder'),
    t('Steps.Step4.header2'),
    t('Steps.Step4.slotCategory.sesson.title'),
    t('Steps.Step4.slotCategory.sesson.category1'),
    t('Steps.Step4.slotCategory.sesson.category2'),
    t('Steps.Step4.slotCategory.sesson.category3'),
    t('Steps.Step4.slotCategory.duration.title'),
    t('Steps.Step4.slotCategory.duration.category1'),
    t('Steps.Step4.slotCategory.duration.category2'),
    t('Steps.Step4.slotCategory.timeslot.title'),
    t('Steps.Step4.slotCategory.timeslot.category1'),
    t('Steps.Step4.slotCategory.timeslot.category2'),
    t('Steps.Step4.slotCategory.timeslot.category3'),
    t('Steps.Step4.slotCategory.timeslot.category4'),
    t('Steps.stepBtn'),
  ];

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
                {/* header 1 */}
                <InputHeader label={header1} />
                <View className="p-3 py-2 pb-4  flex-column ">
                  {/* input for dropDown1 for selecting Type of Tutor  */}
                  <TouchableInput label={tutorTypePlaceholder} />
                  {/* input for dropDown2 for selecting tutur teaching lang */}
                  <TouchableInput label={teachingLanguagePlaceholder} />
                  {/* input for dropDown3 for selecting course */}
                  <TouchableInput label={coursePlaceholder} />
                </View>

                <InputHeader label={header2} />

                <TimeSlots />
              </ScrollView>
              <View className="absolute bottom-2 left-0 right-0 p-4  shadow-xl">
                <PrimaryButton label={stepBtn} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
