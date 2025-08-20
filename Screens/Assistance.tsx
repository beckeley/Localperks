import BellButton from '@/components/BellButton';
import ProfilIcon from '@/components/ProfileIcon';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,


} from 'react-native';
import { IconButton, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const AssistanceScreen = ({ navigation }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  {/*
    const handleEmergencyPress = () => {
      Alert.alert(
        'Emergency Service',
        'This will connect you to emergency services. Continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Call Now',
            style: 'destructive',
            onPress: () => {
              Linking.openURL('tel:911'); // Replace with your emergency number
            },
          },
        ]
      );
    };

    const handleCallSupportPress = () => {
      Alert.alert(
        'Call Support',
        'Contact our support team during business hours.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Call Now',
            onPress: () => {
              Linking.openURL('tel:+1234567890'); // Replace with your support number
            },
          },
        ]
      );
    };
*/}
  const handleMessagesPress = () => {
    // Navigate to messages/chat screen
    navigation.navigate('Messages');
  };

  // const handleWhatsAppPress = () => {
  //   const phoneNumber = '+1234567890'; // Replace with your WhatsApp number
  //   const url = `whatsapp://send?phone=${phoneNumber}`;
    
    
  // };

  // const handleTrustedMarineServices = () => {
  //   // Navigate to trusted marine services or show more info
  //   Alert.alert('Trusted Marine Services', 'YOTCARD Recommendation feature coming soon!');
  // };

  // const handlePerksDirectSupport = () => {
  //   // Navigate to perks direct support or show more info
  //   Alert.alert('Perks Direct Support', 'Direct support feature coming soon!');
  // };

  const handleChatPress = () => {
    navigation.navigate('Chat');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['left', 'right']}>
        <Appbar.Header style={styles.appBarHeader}>
        <ProfilIcon/>
        <Appbar.Content title='Assistance' titleStyle={styles.title} />
        <BellButton/>
      </Appbar.Header>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

      



        <View style={styles.topRow}>
          <TouchableOpacity 
            style={[styles.supportCard, styles.emergencyCard]} 
          >
            <View style={styles.emergencyIcon}>
              <IconButton 
                icon="alert-decagram"
                size={40} 
                iconColor="#FF5C5C"
                style={styles.iconButtonStyle}
                

              />
            </View>
            <Text style={styles.cardTitle}>Emergency</Text>
            <Text style={styles.cardSubtitle}>24/7 Service</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.supportCard} 
            onPress={handleMessagesPress}
          >
            <View style={styles.iconContainer}>
              <IconButton
                icon="message" 
                size={40} 
                iconColor="#666"
                style={styles.iconButtonStyle}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>12</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Messages</Text>
            <Text style={styles.cardSubtitle}>Chat & Support</Text>
          </TouchableOpacity>
        </View>


        
        <View style={styles.bottomRow}>
          <TouchableOpacity 
            style={styles.supportCard} 

          >
            <View style={styles.iconContainer}>
              <IconButton 
                icon="phone-in-talk" 
                size={40} 
                iconColor="#666"
                style={styles.iconButtonStyle}
              />
            </View>
            <Text style={styles.cardTitle}>Call Support</Text>
            <Text style={styles.cardSubtitle}>9am - 9pm CET</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.supportCard} 
          >
            <View style={styles.iconContainer}>
              <IconButton 
                icon="whatsapp" 
                size={40} 
                iconColor="#232627"
                style={styles.iconButtonStyle}
                
              />
            </View>
            <Text style={styles.cardTitle}>WhatsApp</Text>
            <Text style={styles.cardSubtitle}>24/7 Assistance</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        {showDisclaimer && (
          <View style={styles.disclaimer}>
            <IconButton
              icon="close"
              size={16}
              iconColor="#fff"
              onPress={() => setShowDisclaimer(false)}
              style={styles.disclaimerClose}
            />
            <Text style={styles.disclaimerTitle}>Disclaimer</Text>
            <Text style={styles.disclaimerText}>
              Lorem ipsum dolor sit amet, consectetur adipisen elit, sed do eiusmod tempor.
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.listItem} 
        >
          <View>
            <Text style={styles.listItemTitle}>Trusted Marine Services</Text>
            <Text style={styles.listItemSubtitle}>YOTCARD Recommendation</Text>
          </View>
          <IconButton 
            icon="chevron-right" 
            size={24} 
            iconColor="#ccc"
            style={styles.iconButtonStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.listItem} 
        >
          <View>
            <Text style={styles.listItemTitle}>Perks Direct Support</Text>
            <Text style={styles.listItemSubtitle}>24/7 Assistance</Text>
          </View>
          <IconButton 
            icon="chevron-right" 
            size={24} 
            iconColor="#ccc"
            style={styles.iconButtonStyle}
          />
        </TouchableOpacity>

      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBarHeader: {
      width: screenWidth,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      marginBottom: 8,
      height: 80,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
      paddingHorizontal: 16,
      alignSelf: 'center',
    },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 14,

  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 14,

  },
  supportCard: {
    backgroundColor: '#ebebeb',
    borderRadius: 12,
    padding: 14,
    width: 165,
    height: 165,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    elevation: 1,
  },
  emergencyCard: {
    backgroundColor: '#ebebeb',
    width:165,
  },
  emergencyIcon: {
  
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  volumeIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    margin: 0,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5757',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  disclaimer: {
    backgroundColor: '#FF5757',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    position: 'relative',
    width: 354,
    height:90,
  },
  disclaimerClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 0,
  },
  disclaimerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
  },
  disclaimerText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 400,
    borderRadius:8,
    paddingRight: 24,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 13,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141718',
    marginBottom: 2,
  },
  listItemSubtitle: {
    fontSize: 13,
    color: '#66676B',
  },
  chatItem: {
    backgroundColor: '#fff5f5',
    borderColor: '#FF5757',
    borderWidth: 1,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconButtonStyle: {
    margin: 0,
    padding: 0,
    width: 46,
    height: 46,

  },
});

export default AssistanceScreen;