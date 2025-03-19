import * as React from 'react';
import {BottomNavigation, Text, useTheme} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../TabPage/Home';
import Chat from '../TabPage/Chat';

const HomeRoute = () => <Text>Home</Text>;
const ChatRoute = () => <Text>Chat</Text>;
const DocumentsRoute = () => <Text>Documents</Text>;
const menuRoute = () => <Text>menu</Text>;

const MainNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const {colors} = useTheme();

  const routes = [
    {key: 'home', title: 'Home', icon: 'home-outline', activeIcon: 'home'},
    {
      key: 'chat',
      title: 'Chat',
      icon: 'chatbubble-outline',
      activeIcon: 'chatbubble',
    },
    {
      key: 'documents',
      title: 'Documents',
      icon: 'document-text-outline',
      activeIcon: 'document-text',
    },
    {
      key: 'menu',
      title: 'More',
      icon: 'menu-outline',
      activeIcon: 'menu',
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    chat: Chat,
    documents: Home,
    menu: Chat,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={({route, focused}) => (
          <Ionicons
            name={focused ? route.activeIcon : route.icon}
            size={24}
            color={focused ? colors.primary : 'gray'}
          />
        )}
        renderLabel={({route, focused}) => (
          <Text
            style={[{color: focused ? colors.primary : 'gray'}]}
            className=" text-center font-regular">
            {focused ? route.title : ''}
          </Text>
        )}
        barStyle={{backgroundColor: colors.surface}}
        shifting={true} // Disables shifting to keep layout consistent
      />
    </SafeAreaProvider>
  );
};

export default MainNavigation;
