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
import {useNavigation} from '@react-navigation/native';

export default function Step3() {
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

  let navigation = useNavigation();
  const handleNavigate = async () => {
    navigation.navigate('Step4');
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
                {/* header 1 */}
                <InputHeader label={header1} />
                <View className="p-3 py-2 pb-4  flex-column ">
                  {/* input for dropDown1 for selecting General education  */}
                  <TouchableInput label={generalQualificationPlaceholder} />

                  {/* input for dropDown2 for selecting Islamic education  */}
                  <TouchableInput label={islamicQualificationPlaceholder} />
                </View>

                <InputHeader label={header2} />
                <View className="p-3 py-2 pb-4  flex-column ">
                  <View className="flex-row w-full space-x-5">
                    <View className="flex-1">
                      <InputField label={year} />
                    </View>
                    <View className="flex-1">
                      <InputField label={months} />
                    </View>
                  </View>
                </View>

                <InputHeader label={header3} />
                <View className="p-3 py-2 pb-4  flex-column ">
                  {/* input for dropDown3 for selecting langknown */}
                  <TouchableInput label={languagePlaceholder} />
                </View>
              </ScrollView>
              <View className="absolute bottom-2 left-0 right-0 p-4  shadow-xl">
                <PrimaryButton label={stepBtn} onPress={handleNavigate} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
