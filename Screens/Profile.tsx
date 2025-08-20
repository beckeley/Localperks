import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Avatar,
  Divider,
  IconButton,
  Switch,
  Icon,
} from 'react-native-paper';
import useProfileStore from '../Screens/profileStore'; // Import your Zustand store

export default function Profile() {
  const profile = require('../assets/images/explore/6c53801e83447443d344bb8bc63fd2f044ba807b.png');
  const vector = require('../assets/images/explore/Vector (4).png');
  const eli = require('../assets/images/signin/Ellipse 195.png');
  const navigation = useNavigation();

  // Get profile data from Zustand store
  const { profile: profileData } = useProfileStore();

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  // Create display name from profile data
  const displayName = profileData.name && profileData.surname 
    ? `${profileData.name} ${profileData.surname}`
    : profileData.name 
    ? profileData.name
    : 'Pierre Souriau'; // fallback name

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.topRow}>
        <IconButton icon="close" size={24} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.profileSection}>
        <View style={{ position: 'relative' }}>
          <Avatar.Image size={80} source={profile} />
          <Avatar.Image source={eli} style={styles.badge} size={20} />
          <Image source={vector} style={styles.vector} />
        </View>

        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.id}>YSPS-000001</Text>
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.section}>
        <ProfileItem
          icon="account-outline"
          label="Profile Settings"
          onPress={() => navigation.navigate('ProfileSetting')}
        />
        <Divider style={styles.divider} />
        <ProfileItem icon="tag-outline" label="Offer Preferences" />
        <Divider style={styles.divider} />
        <ProfileItem icon="lock-outline" label="Privacy & Security" />
      </View>

      <Text style={styles.sectionTitle}>Referral</Text>
      <View style={styles.section}>
        <ProfileItem icon="account-multiple" label="Refer a Friend" />
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.section}>
        <View style={styles.preferenceRow}>
          <View style={styles.leftRow}>
            <View style={styles.iconWrapper}>
              <Icon source="weather-night" size={20} color="#212121" />
            </View>
            <Text style={styles.label}>Dark Theme</Text>
          </View>
          <Text style={styles.soon}>Coming Soon!</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.preferenceRow}>
          <View style={styles.leftRow}>
            <View style={styles.iconWrapper}>
              <Icon source="bell-outline" size={20} color="#212121" />
            </View>
            <Text style={styles.label}>Push Notifications</Text>
          </View>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="green"
          />
        </View>

        <Divider style={styles.divider} />

        <TouchableOpacity style={styles.logoutRow} activeOpacity={0.7}>
          <View style={styles.iconWrapper}>
            <Icon source="logout" size={20} color="#e53935" />
          </View>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const ProfileItem = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.profileItem} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.leftRow}>
      <View style={styles.iconWrapper}>
        <Icon source={icon} size={20} color="#212121" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Icon source="chevron-right" size={18} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topRow: {
    alignItems: 'flex-start',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  id: {
    color: '#616161',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#616161',
    fontSize: 13,
    paddingLeft: 16,
    paddingVertical: 6,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#212121',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  soon: {
    fontSize: 14,
    color: '#212121',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
  },
  logoutText: {
    color: '#D10000',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  divider: {
    marginHorizontal: 16,
    color: '#2323230',
    borderRadius: 5,
  },
  vector: {
    width: 75,
    height: 30,
    resizeMode: 'contain',
    marginTop: -5,
    zIndex: -2
  },
  badge: {
    position: 'absolute',
    top: 60,
    right: 2,
  },
});