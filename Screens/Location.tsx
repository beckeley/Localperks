import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Dimensions,
  Image,
  LayoutChangeEvent,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton, Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';

const LOCATIONS = [
  { name: 'Around Me', description: 'Automatically detect your location' },
  { name: 'Popular Destinations', description: '' },
  { name: 'Abu Dhabi', description: 'The Winter Capital of Yachting' },
  { name: 'Monaco', description: 'The Home of Yachting' },
  { name: 'Cannes', description: 'Glamour & Yachting on the Riviera' },
  { name: 'Fort Lauderdale', description: 'Gateway to the Caribbean' },
  { name: 'Hulhumalé', description: 'Maldives’ Pristine Waters' },
];

const locationIcons: Record<string, any> = {
  'Around Me': require('../assets/images/home/drop.png'),
  'Abu Dhabi': require('../assets/images/home/dubai.png'),
  'Monaco': require('../assets/images/home/moraco.png'),
  'Cannes': require('../assets/images/home/aussie.png'),
  'Fort Lauderdale': require('../assets/images/home/ind.png'),
  'Hulhumalé': require('../assets/images/home/hotel.png'),
};

type LocationDropdownProps = {
  selectedLocation: string;
  onSelect: (location: string) => void;
};

export default function LocationDropdown({
  selectedLocation,
  onSelect,
}: LocationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = () => setIsOpen(!isOpen);

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setDropdownLayout({ x, y, width, height });
  };

  const handleSelect = async (location: string) => {
    if (location === 'Around Me') {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required.');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = loc.coords;

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address.length > 0) {
          const cityName =
            address[0].city ||
            address[0].district ||
            address[0].region ||
            address[0].country ||
            'Unknown';
          onSelect(cityName);
        } else {
          onSelect('Unknown Location');
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to get location.');
      }
    } else {
      onSelect(location);
    }

    setIsOpen(false);
  };

  const filteredLocations = LOCATIONS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={handlePress}
        onLayout={onLayout}
      >
        <Text style={styles.selectedText}>{selectedLocation}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#232627"
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                top: dropdownLayout.y + dropdownLayout.height + 8,
                left: Dimensions.get('window').width / 2 - 200,
              },
            ]}
          >
              <View style={styles.topRow}>
                <IconButton icon="close" onPress={() => setIsOpen(false)} />
                <Text style={styles.modalTitle}>Change Location</Text>
              </View>

            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Searchbar
                  placeholder="Search for locations"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={styles.searchbar}
                  inputStyle={{ fontSize: 14 }}
                />
              }
              renderItem={({ item }) => {
                if (item.name === 'Popular Destinations') {
                  return <Text style={styles.popular}>Popular Destinations</Text>;
                }

                return (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item.name)}
                  >
                    <View style={styles.iconWrapper}>
                      <Image
                        source={locationIcons[item.name]}
                        style={styles.iconImage}
                      />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 16,
    height: 571,
    width: 400,
    elevation: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  modalTitle: {
    fontSize: 16,
    
   fontWeight: '500',
     marginTop: 12,
     textAlign: 'center',
     left: 68,
    color: '#131313',
     alignSelf: 'center',
  },
  searchbar: {
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    height: 52,
    marginTop: 26
    
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemDescription: {
    fontSize: 13,
    color: '#888',
  },
  popular: {
    fontSize: 14,
    fontWeight: '600',
    color: '#66676b',
    marginTop: 12,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
     width: 354,
    height: 36,
    lineHeight: 14,
    marginTop:16
    
  },
   appBarHeader: {
  backgroundColor: '#fff',
  height: 40,
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

});
