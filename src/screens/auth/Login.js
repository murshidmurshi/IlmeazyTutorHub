import React from 'react';
import {Button, StyleSheet, Text, View, I18nManager, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../../utils/i18n'; // Ensure you have i18n configured
import RNRestart from "react-native-restart";

const App = () => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('dummy_text')}</Text>
      <View style={styles.innerView}>
        <View style={styles.innerViewContainer1}>
          <Text>{t('viewText1')}</Text>
        </View>
        <View style={styles.innerViewContainer2}>
          <Text>{t('viewText2')}</Text>
        </View>
      </View>
      <Button
        title={t('changeLngBtn')}
        onPress={() => {
          i18n
            .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
            .then(() => {
              I18nManager.forceRTL(i18n.language === 'ar');
              RNRestart.Restart();
            })
            .catch(err => {
              Alert.alert("something went wrong while applying RTL")
            });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backfaceVisibility:"yellow",
  },
  text: {
    fontSize: 25,
  },
  innerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  innerViewContainer1: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  innerViewContainer2: {
    backgroundColor: 'blue',
    flex: 1,
  },
});

export default App;