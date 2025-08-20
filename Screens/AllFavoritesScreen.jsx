import React, { useState } from 'react';
import { View, Image, StyleSheet, StatusBar, Alert, FlatList } from 'react-native';
import { Text, Card, Button, ProgressBar, Appbar, IconButton, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoriteItem = {
  id: string;
  title: string;
  image: any;
  quantity: {
    used: number;
    total: number;
  };
  usedBy: string[];
};

// Sample data
const initialFavoriteItems: FavoriteItem[] = [
  {
    id: '1',
    title: 'Premium Coffee Beans - Dark Roast',
    image: require('../assets/images/m/540c522f8f0f543f276ca9091f5541fd9b0b8a30 - Copy.jpg'),
    quantity: { used: 5, total: 20 },
    usedBy: ['user1', 'user2', 'user3']
  },
  {
    id: '2',
    title: 'Wireless Bluetooth Headphones',
    image: require('../assets/images/explore/0a1ef986aa4bd3a2d5b5801bbf776584128e1552.png'),
    quantity: { used: 12, total: 15 },
    usedBy: ['user4', 'user5', 'user6']
  },
  {
    id: '3',
    title: 'Organic Green Tea Collection',
    image: require('../assets/images/explore/1843c9170a8d8abcf009bb82f244ab49922a38de.jpg'),
    quantity: { used: 8, total: 25 },
    usedBy: ['user7', 'user8', 'user9']
  },
  {
    id: '4',
    title: 'Smart Home Assistant Device',
    image: require('../assets/images/explore/rolex.jpg'),
    quantity: { used: 3, total: 10 },
    usedBy: ['user10', 'user11']
  },
  {
    id: '5',
    title: 'Fitness Tracker Watch',
    image: require('../assets/images/explore/spotify.png'),
    quantity: { used: 18, total: 30 },
    usedBy: ['user12', 'user13', 'user14']
  }
];

const FavoriteCard = ({ item, onPress, isEditMode, onDelete }) => {
  const progress = item.quantity.used / item.quantity.total;

  return (
    <Card style={styles.favoriteCard} onPress={!isEditMode ? onPress : undefined}>
      <View style={styles.imageContainer}>
        <Card.Cover source={item.image} style={styles.favoriteCardImage} />
        {isEditMode && (
          <View style={styles.deleteButton}>
            <IconButton
              icon="close"
              size={16}
              iconColor="white"
              style={styles.deleteIconButton}
              onPress={() => onDelete(item.id)}
            />
          </View>
        )}
      </View>

      <Card.Content style={styles.favoriteCardContent}>
        <Text style={styles.favoriteTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.favoriteBottomRow}>
          <View style={styles.quantitySection}>
            <Text style={styles.subLabel}>Quantity</Text>
            <View style={styles.quantityRow}>
              <Text style={styles.quantityText}>{item.quantity.used}</Text>
              <ProgressBar
                progress={progress}
                color="#FF6B6B"
                style={styles.favoriteProgressBar}
              />
              <Text style={styles.quantityText}>{item.quantity.total}</Text>
            </View>
          </View>

          <View style={styles.usedBySection}>
            <Text style={styles.subLabel}>Used by</Text>
            <View style={styles.avatarStack}>
              <Image source={require('../assets/images/explore/p.jpg')} style={styles.avatarImage} />
              <Image source={require('../assets/images/explore/q.png')} style={styles.avatarImage} />
              <Image source={require('../assets/images/explore/d.png')} style={styles.avatarImage} />
              <View style={styles.avatarCount}>
                <Text style={styles.avatarCountText}>+68</Text>
              </View>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const AllFavoritesScreen = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState(initialFavoriteItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleCardPress = (itemId: string) => {
    navigation.navigate('DealDetails', { dealId: itemId });
  };

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleEdit = () => setIsEditMode(true);
  const handleSave = () => {
    setIsEditMode(false);
    console.log('Edit mode saved');
  };
  const handleCancel = () => setIsEditMode(false);

  const handleDeleteItem = (itemId: string) => {
    const item = favoriteItems.find(item => item.id === itemId);
    Alert.alert(
      'Delete Favorite',
      `Are you sure you want to delete "${item?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFavoriteItems(prev => prev.filter(item => item.id !== itemId));
          }
        }
      ]
    );
  };

  const handleAddFavorite = () => {
    const newItem: FavoriteItem = {
      id: Date.now().toString(),
      title: 'New Favorite Item',
      image: require('../assets/images/explore/p.jpg'),
      quantity: { used: 0, total: 1 },
      usedBy: []
    };
    setFavoriteItems(prev => [...prev, newItem]);
  };

  const renderHeaderButtons = () => (
    <View style={styles.headerContainer}>
      <View style={styles.actionButtons}>
        {!isEditMode ? (
          <>
            <Button
              mode="contained"
              onPress={handleShare}
              style={styles.shareButton}
              labelStyle={styles.shareButtonText}
              icon="share-variant"
            >
              Share List
            </Button>
            <IconButton
              icon="pencil-outline"
              size={20}
              onPress={handleEdit}
              style={styles.editButton}
            />
          </>
        ) : (
          <>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
              labelStyle={styles.saveButtonText}
            >
              Save
            </Button>
            <IconButton
              icon="close"
              size={20}
              onPress={handleCancel}
              style={styles.cancelButton}
            />
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Top Appbar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Favorites" titleStyle={styles.titleCenter} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="black"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item onPress={handleShare} title="Share List" />
          <Menu.Item onPress={() => console.log('Settings pressed')} title="Settings" />
        </Menu>
      </Appbar.Header>

      {/* Favorite Items List with Header Buttons */}
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            onPress={() => handleCardPress(item.id)}
            isEditMode={isEditMode}
            onDelete={handleDeleteItem}
          />
        )}
        ListHeaderComponent={renderHeaderButtons}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No favorites yet!</Text>
            <Text style={styles.emptyStateSubtext}>Add some items to your favorites list</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      {!isEditMode && (
        <View style={styles.fabContainer}>
          <IconButton
            icon="plus"
            size={24}
            iconColor="white"
            style={styles.fab}
            onPress={handleAddFavorite}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllFavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
  },
  appbar: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    height: 46,
  },
  titleCenter: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  shareButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  favoriteCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  favoriteCardImage: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  deleteIconButton: {
    backgroundColor: '#FF6B6B',
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 0,
  },
  favoriteCardContent: {
    padding: 16,
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 12,
    lineHeight: 22,
  },
  favoriteBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  quantitySection: {
    flex: 1,
    marginRight: 16,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityText: {
    fontSize: 12,
    color: '#666',
  },
  favoriteProgressBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
  },
  usedBySection: {
    alignItems: 'flex-end',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: -8,
  },
  avatarCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  avatarCountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
