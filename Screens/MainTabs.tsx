import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ScreenB from './screenB';
import Explore from './Explore';
import Messages from './Messages';
import News from './news';
import Wallet from './wallet';

const MainTabs = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'explore',
      title: 'Explore',
      focusedIcon: 'compass',
      unfocusedIcon: 'compass-outline',
    },
    {
      key: 'news',
      title: 'News',
      focusedIcon: 'newspaper',
      unfocusedIcon: 'newspaper-variant-outline',
    },
    {
      key: 'wallet',
      title: 'Wallet',
      focusedIcon: 'wallet',
      unfocusedIcon: 'wallet-outline',
    },
    {
      key: 'messages',
      title: 'Messages',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
  ]);

  // Improved component definitions with proper navigation passing
  const HomeScreen = () => <ScreenB navigation={navigation} />;
  
  const ExploreScreen = () => <Explore navigation={navigation} />;
  
  const NewsScreen = () => <News/>;
  
  const WalletScreen = () => <Wallet navigation={navigation} />;
  
  const MessagesScreen = () => <Messages navigation={navigation} />;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    explore: ExploreScreen,
    news: NewsScreen,
    wallet: WalletScreen,
    messages: MessagesScreen,
  });

  // Optional: Handle tab press analytics or custom behavior
  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    
    // Optional: Add analytics tracking
    // Analytics.track('Tab Changed', { tabName: routes[newIndex].title });
    
    // Optional: Add haptic feedback
    // import * as Haptics from 'expo-haptics';
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <StatusBar style="auto" />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        barStyle={{ 
          backgroundColor: '#fff',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
        activeColor="#FF5C00"
        inactiveColor="#666"
        shifting={false}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        keyboardHidesNavigationBar={true}
      />
    </>
  );
};

export default MainTabs;