import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeLanguage} from '../redux/slices/settingSlice';

export default function ChangeLanguage() {
  let dispatch = useDispatch();
  const {language} = useSelector(state => state.setting);
  const SwitchLang = lang => {
    changeLanguage(dispatch, lang);
  };
  return (
    <View>
      <Text>Current Language: {language}</Text>
      <Button title="Switch to Arabic" onPress={() => SwitchLang('ar')} />
      <Button title="Switch to English" onPress={() => SwitchLang('en')} />
      <Button title="Switch to Indonesian" onPress={() => SwitchLang('id')} />
    </View>
  );
}

const styles = StyleSheet.create({});
