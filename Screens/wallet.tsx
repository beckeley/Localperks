import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDealApplicationsStore from '../Screens/dealdetailsstore';

import BellButton from '@/components/BellButton';
import ProfilIcon from '@/components/ProfileIcon';

const screenWidth = Dimensions.get('window').width;

const WalletScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Ongoing');
  
  const applications = useDealApplicationsStore((state) => state.applications);
  const getApplicationsByStatus = useDealApplicationsStore((state) => state.getApplicationsByStatus);
  const getPendingCount = useDealApplicationsStore((state) => state.getPendingCount);
  const getOngoingCount = useDealApplicationsStore((state) => state.getOngoingCount);
  const getExpiredCount = useDealApplicationsStore((state) => state.getExpiredCount);
  const updateApplicationStatus = useDealApplicationsStore((state) => state.updateApplicationStatus);
  const removeApplication = useDealApplicationsStore((state) => state.removeApplication);

  // Filter applications by status
  const filteredApplications = useMemo(() => {
    const status = selectedTab.toLowerCase() as 'ongoing' | 'pending' | 'expired';
    return getApplicationsByStatus(status);
  }, [selectedTab, applications, getApplicationsByStatus]);

  // Static deals for demonstration (existing deals)
  const staticDeals = [
    {
      id: 'static-1',
      title: 'Unlock a limited-edition capsule collection',
      expiry: 'Available until Jun 12, 2025',
      logo: require('../assets/images/wallet/Frame 48095827.png'),
    },
    {
      id: 'static-2',
      title: 'Rolax x Open | Guestlist',
      expiry: 'Available until Jun 12, 2025',
      logo: require('../assets/images/wallet/Frame 48095827 (1).png'),
    },
    {
      id: 'static-3',
      title: '20% Discount Online',
      expiry: 'Available until Jun 12, 2025',
      logo: require('../assets/images/wallet/Frame 48095827 (2).png'),
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Available until ${date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })}`;
  };

  // Handle long press actions for applications
  const handleApplicationLongPress = (app: any) => {
    Alert.alert(
      'Manage Application',
      `What would you like to do with "${app.dealTitle}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Mark as Ongoing',
          onPress: () => updateApplicationStatus(app.id, 'ongoing'),
          style: 'default',
        },
        {
          text: 'Mark as Expired',
          onPress: () => updateApplicationStatus(app.id, 'expired'),
          style: 'default',
        },
        {
          text: 'Remove',
          onPress: () => removeApplication(app.id),
          style: 'destructive',
        },
      ]
    );
  };

  // Handle need help press
  const handleNeedHelpPress = () => {
    navigation.navigate('AssistanceScreen');
  };

  // Render deal card for applications
  const renderApplicationCard = (app: any) => (
    <TouchableOpacity
      key={app.id} 
      style={styles.dealCard}
      onLongPress={() => handleApplicationLongPress(app)}
    >
      <View style={styles.brandLogoContainer}>
        {app.brandLogo ? (
          <Image source={{ uri: app.brandLogo }} style={styles.brandLogo} />
        ) : (
          <View style={styles.defaultLogo}>
            <Text style={styles.defaultLogoText}>
              {app.dealPartner ? app.dealPartner.charAt(0).toUpperCase() : 'D'}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle}>{app.dealTitle}</Text>
        <Text style={styles.dealPartner}>by {app.dealPartner}</Text>
        <Text style={styles.expiry}>
          {app.expiryDate ? formatDate(app.expiryDate) : 'Processing...'}
        </Text>
        {selectedTab === 'Pending' && (
          <Text style={styles.pendingStatus}>Application under review</Text>
        )}
        {selectedTab === 'Ongoing' && (
          <Text style={styles.ongoingStatus}>Active deal</Text>
        )}
        {selectedTab === 'Expired' && (
          <Text style={styles.expiredStatus}>Expired</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // Render static deal card
  const renderStaticDeal = (deal: any) => (
    <View key={deal.id} style={styles.dealCard}>
      <View style={styles.brandLogoContainer}>
        <Image source={deal.logo} style={styles.brandLogo} />
      </View>
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle}>{deal.title}</Text>
        <Text style={styles.expiry}>{deal.expiry}</Text>
      </View>
    </View>
  );

  // Get count for each tab
  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'Pending':
        return getPendingCount();
      case 'Ongoing':
        return getOngoingCount();
      case 'Expired':
        return getExpiredCount();
      default:
        return 0;
    }
  };

  return (
  <SafeAreaView
    style={{ flex: 1, backgroundColor: '#fafafa' }}
    edges={['left', 'right']}
  >
    <View style={styles.container}>
      <Appbar.Header style={styles.appBarHeader}>
        <ProfilIcon />
        <Appbar.Content title="Wallet" titleStyle={styles.title} />
        <BellButton />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Content starts here */}
        <View style={styles.helpRow}>
          <TouchableOpacity onPress={handleNeedHelpPress}>
            <Text style={styles.helpText}>Need Help?</Text>
          </TouchableOpacity>
          <View style={styles.activeStatus}>
            <Image
              source={require('../assets/images/wallet/tick-circle.png')}
              style={styles.badge}
            />
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        <Image
          source={require('../assets/images/wallet/Glassmorphism.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>My Deals & Benefits</Text>

        <View style={styles.tabs}>
          {['Ongoing', 'Pending', 'Expired'].map((tab) => {
            const count = getTabCount(tab);
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.tabActive]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={selectedTab === tab ? styles.tabTextActive : styles.tabText}>
                  {tab}
                  {count > 0 && (
                    <Text style={styles.tabBadge}> ({count})</Text>
                  )}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.cardList}>
          {filteredApplications.length > 0 ? (
            filteredApplications.map(renderApplicationCard)
          ) : selectedTab === 'Ongoing' && filteredApplications.length === 0 ? (
            staticDeals.map(renderStaticDeal)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {selectedTab === 'Pending'
                  ? 'No pending applications'
                  : selectedTab === 'Expired'
                    ? 'No expired deals'
                    : 'No deals available'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedTab === 'Pending'
                  ? 'Your applications will appear here after submission'
                  : selectedTab === 'Expired'
                    ? 'Expired deals will appear here'
                    : 'Active deals will appear here'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
);

};

export default WalletScreen;

// Styles remain the same as your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
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
    marginBottom: 16,
    height: 80,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingHorizontal: 16,
    alignSelf: 'center',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  helpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  helpText: {
    color: '#ff5757',
    fontWeight: '400',
  },
  activeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeText: {
    fontWeight: 'bold',
  },
  cardImage: {
    width: screenWidth - 32,
    height: 215,
    borderRadius: 12,
    marginVertical: 10,
    alignSelf: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 6,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: '#FF5C5C',
  },
  tabText: {
    color: 'grey',
  },
  tabTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBadge: {
    fontSize: 12,
  },
  cardList: {
    gap: 10,
    paddingHorizontal: 16,
    minHeight: 200,
  },
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  brandLogoContainer: {
    marginRight: 12,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  defaultLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5C5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultLogoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dealContent: {
    flex: 1,
  },
  dealTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  dealPartner: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  expiry: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
  },
  pendingStatus: {
    color: '#FF9500',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  ongoingStatus: {
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  expiredStatus: {
    color: '#F44336',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyStateSubtext: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  badge: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
});