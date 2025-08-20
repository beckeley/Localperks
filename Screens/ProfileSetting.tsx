import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Appbar, Avatar, TextInput, Text, Button, Divider, ProgressBar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import useProfileStore from '../Screens/profileStore'; // Import your Zustand store

const profileImage = require('../assets/images/explore/6c53801e83447443d344bb8bc63fd2f044ba807b.png');

const yesNoData = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const genderData = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function ProfileSetting() {
  const navigation = useNavigation();
  
  // Zustand store hooks
  const {
    profile,
    isSaving,
    error,
    updateProfile,
    saveProfile,
    clearError,
    isProfileComplete,
    getProfileCompletionPercentage,
  } = useProfileStore();

  // Clear error when component mounts
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, []);

  const handleSave = async () => {
    const result = await saveProfile();
    
    if (result.success) {
      Alert.alert(
        'Success',
        'Profile saved successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert(
        'Error',
        result.error || 'Failed to save profile',
        [{ text: 'OK' }]
      );
    }
  };

  const completionPercentage = getProfileCompletionPercentage();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Appbar.Header style={{backgroundColor:'white'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Profile Settings"
          titleStyle={{ color: 'black', fontWeight: '500', fontSize: 20 }}
        />
      </Appbar.Header>

      

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={100} source={profileImage} />
            <TouchableOpacity style={styles.editIcon}>
              <Avatar.Icon size={30} icon="image-edit" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.blocka}>
            <Text style={styles.sectionHeader}>Personal Information</Text>

            <TextInput
              placeholder="Name"
              value={profile.name}
              onChangeText={(value) => updateProfile('name', value)}
              style={[styles.input, {borderRadius: 16}]}
              textColor="black"
              mode="outlined"
              theme={{
                roundness: 15,
                colors: {
                  text: 'black',
                  primary: '#fafafa',
                  placeholder: 'gray',
                  outline: '#e0e0e0',
                },
              }}
            />

            <TextInput
              placeholder="Surname"
              value={profile.surname}
              onChangeText={(value) => updateProfile('surname', value)}
              style={[styles.input, { borderRadius: 16 }]}
              textColor="black"
              mode="outlined"
              theme={{
                roundness: 15,
                colors: {
                  text: 'black',
                  primary: '#fafafa',
                  placeholder: 'gray',
                  outline: '#e0e0e0',
                },
              }}
            />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainer}
              itemTextStyle={styles.itemText}
              containerStyle={styles.dropdownContainer}
              data={genderData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={profile.gender}
              onChange={(item) => updateProfile('gender', item.value)}
            />

            <TextInput
              placeholder="Country"
              value={profile.country}
              onChangeText={(value) => updateProfile('country', value)}
              style={[styles.input, { borderRadius: 16 }]}
              textColor="black"
              mode="outlined"
              theme={{
                roundness: 15,
                colors: {
                  text: 'black',
                  primary: '#fafafa',
                  placeholder: 'gray',
                  outline: '#e0e0e0',
                },
              }}
            />

            <TextInput
              placeholder="Language"
              value={profile.lang}
              textColor="black"
              onChangeText={(value) => updateProfile('lang', value)}
              style={styles.input}
              mode="outlined"
              theme={{
                roundness: 15,
                colors: {
                  primary: '#fafafa',
                  outline: '#e0e0e0',
                  placeholder: 'gray',
                },
              }}
            />
            
            <TextInput
              placeholder="City"
              value={profile.city}
              textColor="black"
              onChangeText={(value) => updateProfile('city', value)}
              style={[styles.input, { borderRadius: 16 }]}
              mode="outlined"
              theme={{
                roundness: 15,
                colors: {
                  primary: '#fafafa',
                  outline: '#e0e0e0',
                  placeholder: 'gray',
                },
              }}
            />
          </View>

          <Divider style={styles.divider} />
          <Text style={styles.sectionHeader}>Contact Details</Text>

          <TextInput
            placeholder="Email Type (e.g. Email, SMS)"
            value={profile.emailType}
            textColor="black"
            onChangeText={(value) => updateProfile('emailType', value)}
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                text: 'black',
                primary: '#fafafa',
                placeholder: 'gray',
                outline: '#e0e0e0'
              },
            }}
          />

          <TextInput
            placeholder="Email"
            value={profile.email}
            textColor="black"
            onChangeText={(value) => updateProfile('email', value)}
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                text: 'black',
                primary: '#fafafa',
                placeholder: 'gray',
                outline: '#e0e0e0'
              },
            }}
          />

          <TextInput
            placeholder="Phone Number"
            value={profile.phone}
            onChangeText={(value) => updateProfile('phone', value)}
            textColor="black"
            keyboardType="phone-pad"
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <TextInput
            placeholder="WhatsApp Number"
            value={profile.whatsapp}
            onChangeText={(value) => updateProfile('whatsapp', value)}
            keyboardType="phone-pad"
            textColor="black"
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <Divider style={styles.divider} />
          <Text style={styles.sectionHeader}>Social & Digital</Text>

          <TextInput
            placeholder="Enter Username"
            value={profile.linkedin}
            onChangeText={(value) => updateProfile('linkedin', value)}
            textColor="black"
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
            left={<TextInput.Affix text="Linkedin/in/" />}
          />

          <TextInput
            placeholder="Instagram Username"
            value={profile.instagram}
            onChangeText={(value) => updateProfile('instagram', value)}
            textColor="black"
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <TextInput
            placeholder="Other Links (optional)"
            value={profile.otherLinks}
            textColor="black"
            onChangeText={(value) => updateProfile('otherLinks', value)}
            style={styles.input}
            keyboardType="url"
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                text: 'black',
                primary: '#fafafa',
                placeholder: 'gray',
                outline: '#e0e0e0',
              },
            }}
          />

          <TextInput
            placeholder="Portfolio (optional)"
            value={profile.portfolio}
            textColor="black"
            onChangeText={(value) => updateProfile('portfolio', value)}
            style={styles.input}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                text: 'black',
                primary: '#fafafa',
                placeholder: 'gray',
                outline: '#e0e0e0',
              },
            }}
          />

          <Divider style={styles.divider} />
          <Text style={styles.sectionHeader}>Connection to Yachting</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemContainerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            containerStyle={styles.dropdownContainer}
            data={yesNoData}
            labelField="label"
            valueField="value"
            placeholder="Yachting Business Owner"
            value={profile.yachtingConnection}
            onChange={(item) => updateProfile('yachtingConnection', item.value)}
          />

          <TextInput
            placeholder="Company Name (optional)"
            value={profile.companyName}
            onChangeText={(value) => updateProfile('companyName', value)}
            style={styles.input}
            textColor="black"
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemContainerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            containerStyle={styles.dropdownContainer}
            data={[
              { label: 'Real Estate', value: 'realestate' },
              { label: 'Tech', value: 'tech' },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Industry / Sector Expertise"
            value={profile.industry}
            onChange={(item) => updateProfile('industry', item.value)}
          />

          <TextInput
            placeholder="Annual Income Range (optional)"
            value={profile.income}
            onChangeText={(value) => updateProfile('income', value)}
            style={styles.input}
            textColor="black"
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <TextInput
            placeholder="Estimated Net Worth Range (optional)"
            value={profile.netWorth}
            onChangeText={(value) => updateProfile('netWorth', value)}
            style={styles.input}
            textColor="black"
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: 'gray',
              },
            }}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemContainerStyle={styles.itemContainer}
            itemTextStyle={styles.itemText}
            containerStyle={styles.dropdownContainer}
            data={[
              { label: 'Stocks', value: 'stocks' },
              { label: 'Real Estate', value: 'realestate' },
            ]}
            labelField="label"
            valueField="value"
            placeholder="Business Interests"
            value={profile.businessInterests}
            onChange={(item) => updateProfile('businessInterests', item.value)}
          />

          <Divider style={styles.divider} />
          <Text style={styles.sectionHeader}>Personal Bio</Text>

          <TextInput
            label="Introduce yourself in a few words"
            value={profile.bio}
            onChangeText={(value) => updateProfile('bio', value)}
            multiline
            numberOfLines={5}
            textColor="black"
            style={[styles.input, { height: 188 }]}
            mode="outlined"
            theme={{
              roundness: 15,
              colors: {
                text: 'black',
                primary: '#fafafa',
                placeholder: 'gray',
                outline: '#e0e0e0',
              },
            }}
          />

          <Button
            mode="contained"
            onPress={handleSave}
            loading={isSaving}
            disabled={isSaving}
            style={styles.button}
            contentStyle={{ paddingVertical: 10 }}
            buttonColor="#f25c5c"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: 'white',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  progressText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  input: {
    height: 56,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 16,
    fontWeight: '400',
    paddingHorizontal: 24,
    fontSize: 14,
    backgroundColor: '#fafafa',  
    marginBottom: 12,
    color: 'black',            
  },
  dropdown: {
    height: 56,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    marginBottom: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingHorizontal: 24,
    color: '#9E9E9E',
    fontWeight: '400'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  itemContainer: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownContainer: {
    borderRadius: 16,
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingVertical: 4,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 25,
    width: 354,
    height: 22,
    gap: 9,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
  },
  divider: {
    marginVertical: 10
  },
  blocka: {
    width: 354,
    height: 606,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});