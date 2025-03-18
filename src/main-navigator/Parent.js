import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import BottomNavigation from '../screens/bottom/BottomNavigation';

const Parent = () => {
  let {colors} = useTheme();
  // const {user, isGettingUser} = useSelector(state => state.user);
  // const isAdmin = user?.role == 'admin' || user?.role == 'superadmin';
  // Show a loading indicator while fetching user details
  // if (!user) {
  //   return (
  //     <View
  //       className="flex-1 justify-center items-center"
  //       style={{backgroundColor: colors.background_default}}>
  //       <ActivityIndicator size="large" color={colors?.primary_main} />
  //     </View>
  //   );
  // }

  return (
    <>
      <BottomNavigation />
    </>
  );
};

export default Parent;
