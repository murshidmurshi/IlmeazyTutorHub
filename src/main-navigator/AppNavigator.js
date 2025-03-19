import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Parent from './Parent';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  const {token, tokenStatus} = useSelector(state => state?.normal);
  let {colors} = useTheme();
  console.log(tokenStatus, 'tokenStatus');

  if (tokenStatus === 'loading') {
    // If status is loading, show a spinner
    return (
      <View
        className="flex-1 justify-center "
        style={{backgroundColor: colors.background_default}}>
        <ActivityIndicator size={'large'} color={colors.primary_main} />
      </View>
    );
  }

  const isDarkTheme = colors.background_default === '#000000';
  let barStyle = isDarkTheme ? 'light-content' : 'light-content';

  return (
    <>
      <StatusBar
        backgroundColor={colors.background_default}
        barStyle={barStyle}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {tokenStatus === 'failed' ||
          // (!token && tokenStatus === 'succeeded') ? (
          (token && tokenStatus === 'succeeded') ? (
            // If token status is failed or no token, show onBoarding screen
            <Stack.Screen
              name="FirstScreen"
              component={Login}
              options={{animation: 'fade_from_bottom'}}
            />
          ) : (
            // If token is valid, navigate to Parent screen
            <></>
          )}
          <Stack.Screen
            name="Parent"
            component={Parent}
            options={{animation: 'fade_from_bottom'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{animation: 'ios_from_right'}}
            // options={{animation: 'fade_from_bottom'}}
          />

          {/* Register  */}
          <Stack.Screen
            name="Register"
            component={Register}
            // options={{animation: 'ios_from_right'}}
            options={{animation: 'slide_from_bottom'}}
          />
{/* 
         <Stack.Screen
            name="Parent"
            component={Parent}
            options={{animation: 'fade_from_bottom'}}
          />
           */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
