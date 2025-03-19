import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export default function AppHeader({
  screenName,
  backIcon,
  RenderIcon,
  absolute,
  RenderMenu,
}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {isRTL} = useSelector(state => state?.setting);
  console.log(isRTL, 'isRTLisRTL');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const absoluteStyle = absolute
    ? {
        position: 'absolute',
        top: 0,
        zIndex: 10,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
      }
    : {backgroundColor: colors.primary_main, height: 50};

  return (
    <Appbar.Header style={[absoluteStyle]}>
      {backIcon !== false && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <Ionicon
              name="chevron-back-outline"
              size={26}
              // color={absolute ? colors.text_secondary : colors.text_primary}
              color={'white'}
              style={{
                alignSelf: 'center',
                transform: [{rotate: isRTL ? '180deg' : '0deg'}],
              }}
            />
          )}
          onPress={handleBackPress}
        />
      )}
      <Appbar.Content
        title={screenName}
        titleStyle={{
          fontSize: 17,
          fontFamily: 'Poppins-Medium',
          color: 'white',
          left: !backIcon ? 0 : 0,
        }}
      />
      {RenderIcon && <RenderIcon />}
      {RenderMenu && <RenderMenu />}
    </Appbar.Header>
  );
}
