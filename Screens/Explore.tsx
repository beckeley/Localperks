import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Text, Card, Button, ProgressBar, MD3Colors, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import TopBar from '@/components/TopBar';
import Profile from '@/Screens/Profile';
import BellButton from '@/components/BellButton';
import ProfilIcon from '@/components/ProfileIcon';
import LocationDropdown from '@/Screens/Location';

type DealItem = {
  id: string;
  title: string;
  image: any;
  category: string;
  partner?: string;
  description?: string;
  quantity?: {
    used: number;
    total: number;
  };
  usedBy?: string[];
};

const categories = [
  { label: 'Deals', image: require('../assets/images/explore/rename (3).png') },
  { label: 'Partners', image: require('../assets/images/explore/lighthouse.png') },
  { label: 'Services', image: require('../assets/images/explore/rename (1).png') },
];

// Updated with IDs and additional data
const spotlightDeals: DealItem[] = [
  {
    id: '1',
    title: 'Get a free 1-year Premium trial',
    image: require('../assets/images/explore/spotify.png'),
    category: 'deals',
    partner: 'Spotify',
    description: 'Enjoy unlimited music streaming with Spotify Premium for a full year, completely free! No ads, offline listening, and premium sound quality.',
    quantity: { used: 92, total: 160 },
    usedBy: ['user1', 'user2', 'user3']
  },
  {
    id: '2',
    title: 'Unlock a limited-edition capsule collection',
    image: require('../assets/images/wallet/4520647a64ec56f5bd8df328f50855e7b62a425e.jpg'),
    category: 'deals',
    partner: 'Adidas',
    description: 'Get exclusive access to our limited-edition capsule collection with unique designs. Perfect for fashion enthusiasts who want something special.',
    quantity: { used: 45, total: 100 },
    usedBy: ['user4', 'user5', 'user6']
  },
  {
    id: '3',
    title: 'Receive 100 bottles on us, cheers to good times',
    image: require('../assets/images/explore/1843c9170a8d8abcf009bb82f244ab49922a38de.jpg'),
    category: 'deals',
    partner: 'Beverage Co',
    description: 'Celebrate with 100 complimentary bottles - perfect for your next event! High-quality beverages for any occasion.',
    quantity: { used: 78, total: 200 },
    usedBy: ['user7', 'user8', 'user9']
  },
];

const elitePartners: DealItem[] = [
  {
    id: '4',
    title: 'ETIHAD - Premium Travel Benefits',
    image: require('../assets/images/explore/ethihad.png'),
    category: 'partners',
    partner: 'Etihad Airways',
    description: 'Exclusive travel benefits and rewards with Etihad Airways partnership. Premium flight experiences and member perks.',
    quantity: { used: 120, total: 300 },
    usedBy: ['user10', 'user11', 'user12']
  },
  {
    id: '5',
    title: 'BMW - Ultimate Driving Experience',
    image: require('../assets/images/explore/bmw.jpg'),
    category: 'partners',
    partner: 'BMW',
    description: 'Premium automotive experiences and exclusive BMW benefits. Test drives, service discounts, and VIP events.',
    quantity: { used: 85, total: 150 },
    usedBy: ['user13', 'user14', 'user15']
  },
  {
    id: '6',
    title: 'Adidas Sport Performance Program',
    image: require('../assets/images/explore/Adi.jpg'),
    category: 'partners',
    partner: 'Adidas Sport Performance',
    description: 'Professional training program with premium gear and expert coaching. Elevate your athletic performance.',
    quantity: { used: 67, total: 100 },
    usedBy: ['user16', 'user17', 'user18']
  },
  {
    id: '7',
    title: 'BMW Innovation Hub - Future Tech',
    image: require('../assets/images/explore/bmw.jpg'),
    category: 'partners',
    partner: 'BMW Innovation Hub',
    description: 'Experience next-generation automotive technologies and innovations. Beta access to future mobility solutions.',
    quantity: { used: 92, total: 150 },
    usedBy: ['user19', 'user20', 'user21']
  },
];

// Combine all deals for easy filtering by ID
export const allDeals: DealItem[] = [...spotlightDeals, ...elitePartners];

// Helper function to get deal by ID
export const getDealById = (id: string): DealItem | undefined => {
  return allDeals.find(deal => deal.id === id);
};

// Helper function to filter deals by category
export const getDealsByCategory = (category: string): DealItem[] => {
  return allDeals.filter(deal => deal.category === category);
};

const CategoryIcons = () => (
  <View style={styles.categoryRow}>
    {categories.map((item, idx) => (
      <View key={idx} style={styles.categoryItem}>
        <Image source={item.image} style={styles.categoryIcon} />
        <Text style={styles.categoryLabel}>{item.label}</Text>
      </View>
    ))}
  </View>
);

const HorizontalCardList = ({
  title,
  items,
  navigation,
}: {
  title: string;
  items: DealItem[];
  navigation: any;
}) => (
  <View style={{ marginBottom: 24 }}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Button
        compact
        onPress={() => {
          // Navigate to see all deals page
          navigation.navigate('AllDeals', { category: title.toLowerCase() });
        }}
        labelStyle={{ color: '#FF3B30', fontSize: 12 }}
      >
        See All
      </Button>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 8, paddingBottom: 4 }}
    >
      {items.map((item, index) => (
        <Card
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('DealDetails', { 
            dealId: item.id
          })}
        >
          <Card.Cover source={item.image} style={styles.cardImage} />
          <Card.Content style={styles.cardContent}>
            <Text style={styles.titleText} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.bottomRow}>
              <View style={styles.leftColumn}>
                <Text style={styles.subLabel}>Quantity</Text>
                <View style={styles.quantityRow}>
                  <Text style={styles.subText}>{item.quantity?.used || 92}</Text>
                  <ProgressBar
                    progress={item.quantity ? item.quantity.used / item.quantity.total : 0.57}
                    color={MD3Colors.error50}
                    style={styles.progressBar}
                  />
                  <Text style={styles.subText}>{item.quantity?.total || 160}</Text>
                </View>
              </View>

              <View style={styles.rightColumn}>
                <Text style={styles.subLabel}>Used by</Text>
                <View style={styles.avatarStack}>
                  <Image source={require('../assets/images/explore/p.jpg')} style={styles.avatarImage} />
                  <Image source={require('../assets/images/explore/q.png')} style={styles.avatarImage} />
                  <Image source={require('../assets/images/explore/d.png')} style={styles.avatarImage} />
                  <View style={styles.avatarCount}>
                    <Text style={styles.avatarCountText}>
                      +{((item.quantity?.total || 160) - (item.quantity?.used || 92))}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  </View>
);

const ExploreScreen = ({ navigation }: { navigation: any }) => {
  const [selectedLocation, setSelectedLocation] = useState('Fetching...');

  useEffect(() => {
    const initLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          setSelectedLocation('Location Access Denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const lat = loc.coords.latitude;
        const lon = loc.coords.longitude;

        // Reverse geocode to get city name
        const reverseGeo = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
        if (reverseGeo.length > 0) {
          const city = reverseGeo[0].city || reverseGeo[0].region || 'Unknown';
          const country = reverseGeo[0].country || '';
          setSelectedLocation(`${city}, ${country}`);
        } else {
          setSelectedLocation('Unknown Location');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setSelectedLocation('Location Error');
      }
    };

    initLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }} edges={['top', 'left', 'right']}>
      <Appbar.Header style={styles.appBarHeader}>
        <View style={{ flex: 1 }}>
          <View style={styles.topHeaderRow}>
            <ProfilIcon />
            <LocationDropdown 
              selectedLocation={selectedLocation}
              onSelect={setSelectedLocation}
            /> 
            <BellButton />
          </View>
          <CategoryIcons />
        </View>
      </Appbar.Header>
      
      <ScrollView contentContainerStyle={styles.container}>
        <HorizontalCardList title="Spotlight Deals" items={spotlightDeals} navigation={navigation} />
        <HorizontalCardList title="Elite Partners" items={elitePartners} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  card: {
    width: 240,
    height: 260,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    height: 140,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    lineHeight: 19,
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 2,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  appBarHeader: {
    backgroundColor: '#fff',
    height: 140,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 2,
    bottom: 18,
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: -8,
  },
  avatarCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  avatarCountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  leftColumn: {
    flex: 1,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 6,
  },
  progressBar: {
    width: 60,
    height: 4,
    borderRadius: 3,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
});