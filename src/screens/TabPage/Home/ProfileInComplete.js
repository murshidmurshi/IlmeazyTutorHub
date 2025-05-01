import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../../../components/button/PrimaryButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const Verification_Documents = ({colors, Data}) => {
  let iconSize = 26;

  return (
    <View
      className="rounded-xl border border-gray-300 "
      style={{
        borderColor: colors.divider,
      }}>
      {Data?.map((document, index) => {
        let isVerified = document?.verified == true;
        return (
          <View
            key={index}
            className={`flex-row items-center space-x-3 p-4 border-b  ${
              index == Data.length - 1 ? 'border-b-0' : ''
            }`}
            style={{
              borderColor: colors.divider,
            }}>
            <MaterialIcon
              name={
                isVerified ? 'checkbox-marked-circle-outline' : 'alert-outline'
              }
              size={iconSize}
              color={isVerified ? colors.green : colors.warning}
            />
            <Text
              className={`text-[16px] font-regular`}
              style={{color: colors.text_primary}}>
              {document.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default function ProfileInComplete() {
  let {colors} = useTheme();
  let navigation = useNavigation();

  const {t} = useTranslation();
  const [
    header1,
    header2,
    category1,
    category2,
    category3,
    category4,
    category5,
    completeBtn,
  ] = [
    t('Home.ProfileInComplete.header1'),
    t('Home.ProfileInComplete.header2'),
    t('Home.ProfileInComplete.Category.category1'),
    t('Home.ProfileInComplete.Category.category2'),
    t('Home.ProfileInComplete.Category.category3'),
    t('Home.ProfileInComplete.Category.category4'),
    t('Home.ProfileInComplete.Category.category5'),
    t('Home.ProfileInComplete.completeBtn'),
  ];
  let Data = [
    {id: 1, name: category1, verified: true},
    {id: 2, name: category2, verified: false},
    {id: 3, name: category3, verified: false},
    {id: 4, name: category4, verified: false},
    {id: 5, name: category5, verified: true},
  ];

  const handleNavigate = async () => {
    navigation.navigate('Step2');
  };

  return (
    <>
      <View className=" p-5 top-4">
        <View className="flex-column space-y-6">
          {/* Icon at the top */}
          <View className="self-center">
            <MaterialIcon
              name="file-account-outline"
              size={100}
              color={colors.primary_main}
            />
          </View>

          {/* Title and Subtitle */}
          <View className="flex-column space-y-2">
            <Text
              className="font-semi text-xl text-center"
              style={{color: colors.text_primary}}>
              {header1}
            </Text>
            <Text
              className="font-regular text-md text-center"
              style={{color: colors.text_secondary}}>
              {header2}
            </Text>
          </View>

          {/* Verification Documents */}
          <View className="mt-3 shadow-xl">
            <Verification_Documents colors={colors} Data={Data} />
          </View>

          {/* Button with proper spacing */}
          <View className="mt-6 shadow-md">
            <PrimaryButton label={completeBtn} onPress={handleNavigate} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
