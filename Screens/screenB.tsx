import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import * as Location from 'expo-location';

import ProfilIcon from '../components/ProfileIcon';
import BellButton from '../components/BellButton';
import LocationDropdown from './Location';

const Bgimag = require('../assets/images/home/sky.png');
const qr = require('../assets/images/home/QRbtn.png');

const carouselItems = [
  require('../assets/images/home/card3.png'),
  require('../assets/images/home/17de5dd686a4bd1510dac7e280664ef956364b5f.jpg'),
  require('../assets/images/home/3c9d8c3c51a13467370be96c540bfe5bc2c924e5.jpg'),
  require('../assets/images/home/79da10ab6b25358a3b833f04ac8470137eec2c6c.jpg'),
];

export default function ScreenB() {
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('Fetching...');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const initLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
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

        // Fetch weather for current location
        await fetchWeatherData(lat, lon);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    initLocationAndWeather();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeatherData = async (lat?: number, lon?: number, locationName?: string) => {
    try {
      if (!lat || !lon) {
        if (!locationName) return;
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=5e80147b5b0e8e3b4b32c11ce1a2c4b6`
        );
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) {
          console.error('Location not found');
          setWeatherData(null);
          return;
        }
        lat = geoData[0].lat;
        lon = geoData[0].lon;
      }

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5e80147b5b0e8e3b4b32c11ce1a2c4b6&units=metric`
      );
      const weatherJson = await weatherRes.json();
      setWeatherData(weatherJson);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherData(null);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fafafa' }}>
       <Appbar.Header style={styles.appBarHeader}>
          <ProfilIcon />
          <LocationDropdown
            selectedLocation={selectedLocation}
            onSelect={async (locationName) => {
              setSelectedLocation(locationName);
              await fetchWeatherData(undefined, undefined, locationName);
            }}
          />
          <BellButton />
        </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContent}
      refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        
         
        <View style={styles.welcomeBox}>
          <Text style={styles.text}>Welcome Aboard</Text>
          <Text style={styles.subText}>Where will today take you?</Text>
        </View>

        <Card style={styles.weatherCard}>
          <ImageBackground source={Bgimag} style={styles.cardBackground} imageStyle={{ borderRadius: 16 }}>
            <View style={styles.fullOverlay}>
              <Text style={styles.cityName}>{selectedLocation}</Text>
              <Text style={styles.time}>{currentTime}</Text>

              <Text style={styles.temperature}>
                {weatherData?.main?.temp ? `${Math.round(weatherData.main.temp)}°` : '...'}
              </Text>

              <View style={styles.weatherRow}>
                <Text style={styles.rowText}>
                  ☀️ {weatherData?.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                </Text>
                <Text style={styles.rowText}>
                  🌕 {weatherData?.sys?.sunset ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'}
                </Text>
                <Text style={styles.rowText}>
                  {weatherData?.main ? `H:${Math.round(weatherData.main.temp_max)}° L:${Math.round(weatherData.main.temp_min)}°` : ''}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Card>

        <View style={styles.both}>
          <Text style={styles.cuText}>Curated for You</Text>
          <TouchableOpacity>
            <Text style={styles.seeText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.carouselWrapper}>
          <Carousel
            width={362}
            height={250}
            data={carouselItems}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 0,
            }}
            loop={false}
            autoPlay={false}
            pagingEnabled
            style={{ alignSelf: 'center' }}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <ImageBackground source={item} style={styles.carouselCard} imageStyle={{ borderRadius: 16 }} />
            )}
          />
          <Image source={qr} style={styles.qr} />
          <View style={styles.pagination}>
            {carouselItems.map((_, index) => (
              <View
                key={index}
                style={[styles.dash, activeIndex === index && styles.activeDash]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {},
  welcomeBox: {
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 10,
    width: 338,
    height: 39,
    textAlign: 'center'
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '400',
  },
  weatherCard: {
    marginTop: 20,
    borderRadius: 16,
    width: 354,
    marginLeft: 22
  },
  cardBackground: {
    width: 354,
    height: 129,
    justifyContent: 'center',
    padding: 16,
  },
  fullOverlay: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 16,
    position: 'relative',
  },
  cityName: {
    fontSize: 25,
    fontWeight: '400',
    color: 'white',
  },
  time: {
    fontSize: 14,
    color: '#eee',
  },
  temperature: {
    position: 'absolute',
    top: -4,
    right: 0,
    fontSize: 54,
    fontWeight: '400',
    color: 'white',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  rowText: {
    color: 'white',
    fontSize: 14,
  },
  cuText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 22,
    marginLeft: 12
  },
  seeText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FF5758',
    lineHeight: 22,
    marginRight: 12
  },
  both: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 45,
    marginBottom: 11,
  },
  qr: {
    position: 'absolute',
    bottom: -30,
    right: 12,
    width: 84,
    height: 84,
  },
  carouselWrapper: {
    marginTop: 10,
    marginBottom: 0,
  },
  carouselCard: {
    width: 362,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dash: {
    width: 10,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 4,
  },
  activeDash: {
    backgroundColor: '#FF5758',
    width: 40,
    borderRadius: 4,
    height: 3,
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
