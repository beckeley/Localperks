import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import BellButton from './BellButton';
import LocationDropdown from '@/Screens/Location';

const { width: screenWidth } = Dimensions.get('window');

export default function TopBar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // ✅ FIXED: moved inside the component
  const [selectedLocation, setSelectedLocation] = useState('Around Me');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/images/explore/6c53801e83447443d344bb8bc63fd2f044ba807b.png')}
              style={styles.avatar}
            />
            <Image
              source={require('../assets/images/explore/Vector (4).png')}
              style={styles.vector}
            />
          </View>
        </TouchableOpacity>

        <LocationDropdown
          selectedLocation={selectedLocation}
          onSelect={(loc) => setSelectedLocation(loc)}
          navigation={navigation} // ✅ Pass navigation to allow screen change
        />

        <BellButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
    width: '100%',
  },
  avatarContainer: {
    width: 46,
    height: 52,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  vector: {
    width: 40,
    height: 16,
    marginTop: 0,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
