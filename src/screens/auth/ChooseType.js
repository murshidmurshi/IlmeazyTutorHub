import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/appHeader/AppHeader';
import {RadioButton, useTheme, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import InputHeader from '../../components/Input/InputHeader';
import {Activity_Opacity, hexToRgba} from '../../../utils/global';
import PrimaryButton from '../../components/button/PrimaryButton';

export default function ChooseType() {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const {t} = useTranslation();
  // Extract Page Content
  const {screenName, header1, type1, type2, type3, type4, saveBtn} = {
    screenName: t('ChooseType.screenName'),
    header1: t('ChooseType.header1'),
    type1: t('ChooseType.Type.type1'),
    type2: t('ChooseType.Type.type2'),
    type3: t('ChooseType.Type.type3'),
    type4: t('ChooseType.Type.type4'),
    saveBtn: t('ChooseType.saveBtn'),
  };

  let Data = [
    {id: 1, name: type1},
    {id: 2, name: type2},
    {id: 3, name: type3},
    {id: 4, name: type4},
  ];

  const [value, setValue] = React.useState(type1);

  const handleNavigate = () => {
    navigation.navigate('Register');
  };

  return (
    <>
      <AppHeader screenName={screenName} />
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{flexGrow: 1}} // Ensures scrollability
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.background_default}}>
          {/* header 1 */}
          <InputHeader label={header1} />

          <View className="p-2.5">
            <RadioButton.Group
              onValueChange={value => setValue(value)}
              value={value}>
              {Data?.map((type, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={Activity_Opacity}
                  onPress={() => setValue(type?.name)}
                  className="flex-row items-center my-2  rounded-lg p-1.5 shadow-sm border-0.5"
                  style={{}}>
                  <RadioButton value={type?.name} />
                  <Text
                    className="font-regular text-md ml-1 "
                    style={{
                      color:
                        type.name == value
                          ? colors.primary
                          : colors.text_secondary,
                    }}>
                    {type?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </View>
        </ScrollView>
        {/* Fixed Bottom Button */}
        <View
          className="p-4 pt-1 shadow-xl "
          style={{
            backgroundColor: colors.background_default,
          }}>
          <PrimaryButton label={saveBtn} onPress={handleNavigate} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
