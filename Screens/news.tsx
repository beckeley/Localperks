import { 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  StatusBar
} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import ProfilIcon from '@/components/ProfileIcon'
import { Appbar } from 'react-native-paper'
import BellButton from '@/components/BellButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const screenWidth = Dimensions.get('window').width;

const cards = [
  {
    id: '1',
    title: 'Around Me',
    subtitle: 'Nearby Favorites',
    images: [
      require('../assets/images/m/polo.jpg'),
      require('../assets/images/m/28414cd764a5fc2a16e7eeab1b118704d125e403 - Copy.jpg'),
      require('../assets/images/m/hh.jpg'),
      require('../assets/images/m/7cde15020ce48a02f4d13c9ca6121f837c9126ae.png'),
    ],
    screen: 'AroundMeScreen',
  },
  {
    id: '2',
    title: 'All Favorites',
    subtitle: '222 items',
    images: [
      require('../assets/images/m/540c522f8f0f543f276ca9091f5541fd9b0b8a30 - Copy.jpg'),
    ],
    screen: 'AllFavoritesScreen',
  },
  {
    id: '3',
    title: 'Ongoing Perks',
    subtitle: '88 items',
    images: [
      require('../assets/images/m/0783bfd95fbe82c53ce5fd5000cff77a3bdf661c.jpg'),
    ],
    screen: 'OngoingPerksScreen',
  },
];

const CategoryCard = ({ title, subtitle, images, screen }: any) => {
  const navigation = useNavigation<any>();
  const imageCount = images.length;

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate(screen)}
    >
      <View style={styles.imageGrid}>
        {images.map((img: any, index: number) => (
          <Image 
            key={index} 
            source={img} 
            style={[
              imageCount === 1 && styles.oneImage,
              imageCount === 2 && styles.twoImage,
              imageCount === 4 && styles.fourImage,
            ]}
            resizeMode="cover"
          />
        ))}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const News = () => {
  return (
    <SafeAreaView style={styles.safeArea}
      edges={['left', 'right']}>
      <Appbar.Header 
        style={styles.appBarHeader} 
        >
        <ProfilIcon />
        <Appbar.Content title="My Lists" titleStyle={styles.title} />
        <BellButton />
      </Appbar.Header>

      <ScrollView 
        style={{ flex: 1, backgroundColor: '#fafafa' }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Two cards side by side */}
        <View style={styles.cardRow}>
          {cards.slice(0, 2).map((card) => (
            <CategoryCard 
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              images={card.images}
              screen={card.screen}
            />
          ))}
        </View>

        {/* Full width card */}
        <View style={{ marginHorizontal: 16 }}>
          <CategoryCard 
            key={cards[2].id}
            title={cards[2].title}
            subtitle={cards[2].subtitle}
            images={cards[2].images}
            screen={cards[2].screen}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default News

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  title: {
    color: '#131313',
    fontWeight: 500,
    fontSize: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  card: {
    width: (screenWidth - 48) / 2,
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 12,
    overflow: 'hidden',
    gap: 4, // spacing between images
  },
  oneImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  twoImage: {
    width: '48%',
    height: 160,
    borderRadius: 8,
  },
  fourImage: {
    width: '48%',
    height: 90, // increased size
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 8,
    marginHorizontal: 4,
    fontWeight: '500',
    fontSize: 16,
    color: '#FF5757',
  },
  cardSubtitle: {
    marginBottom: 8,
    marginHorizontal: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#66676B',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF5757',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
})
