// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenA from '../lastb/Screens/screenA';
import ScreenB from '../lastb/Screens/screenB';
import SignUp from '../lastb/Screens/signUp';
import MainTabs from './Screens/MainTabs';
import Messages from './Screens/Messages';
import Wallet from './Screens/wallet';
import List from './Screens/news';
import Profile from './Screens/Profile';
import LocationDropdown from './Screens/Location';
import ProfileSetting from './Screens/ProfileSetting';
import DealDetails from './Screens/DealDetails';
import ExploreScreen from '../lastb/Screens/Explore';
import Chat from './Screens/Chat';
import DealApplicationForm from '../lastb/Screens/dealApplicationForm';
import AssistanceScreen from './Screens/Assistance';
import AroundMeScreen from './Screens/AroundMeScreen';
import AllFavoritesScreen from './Screens/AllFavoritesScreen';  
import OngoingPerksScreen from './Screens/OngoingPerksSreen';



export type RootStackParamList = {
  ScreenA: undefined;
  ScreenB: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  List: undefined;
  Wallet: undefined;
  Messages: undefined;
  Profile: undefined;
  LocationDropdown: undefined;
  ProfileSetting: undefined;
  DealDetails: { dealId: string };
  ExploreScreen: undefined;
  DemoCarousel: undefined;
  Maps: undefined;
  Chat: undefined;
  AssistanceScreen: undefined;
  DealApplicationForm: {
    dealId: string;
    dealTitle: string;
    dealPartner: string;
    dealLogo: any;
    dealEndDate: string;
    AllFavoritesScreen: undefined;
    OngoingPerksScreen: undefined;
    AroundMeScreen: undefined;  

  };


  
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ScreenA"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="ScreenA" component={ScreenA} />
          <Stack.Screen name="ScreenB" component={ScreenB} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="LocationDropdown" component={LocationDropdown} />
          <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
          <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
          <Stack.Screen name="DealDetails" component={DealDetails} />
          <Stack.Screen name="Chat" component={Chat} />
<Stack.Screen name="AssistanceScreen" component={AssistanceScreen} />
          <Stack.Screen name="DealApplicationForm" component={DealApplicationForm} />
          <Stack.Screen name="AroundMeScreen" component={AroundMeScreen} />
          <Stack.Screen name="AllFavoritesScreen" component={AllFavoritesScreen} />  
          <Stack.Screen name="OngoingPerksScreen" component={OngoingPerksScreen} />
        
        </Stack.Navigator>

      </NavigationContainer>
    </PaperProvider>
  );
}