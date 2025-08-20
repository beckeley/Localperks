import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adjust path based on your project

export default function ProfilIcon() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.touchable}>
        <Image
          source={require('../assets/images/explore/6c53801e83447443d344bb8bc63fd2f044ba807b.png')}
          style={styles.avatar}
        />
        <Image
          source={require('../assets/images/explore/Vector (4).png')}
          style={styles.vector}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 46,
    height: 50,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  vector: {
    width: 45,
    height: 15,
  },
});
