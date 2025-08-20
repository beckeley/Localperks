import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Searchbar, Badge, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProfilIcon from '@/components/ProfileIcon';
import BellButton from '@/components/BellButton';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  Messages: undefined;
  Chat: { userId: string };
};

type MessagesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Messages'
>;

type Props = {
  navigation: MessagesScreenNavigationProp;
};

const blueBadge = require('../assets/images/chat/Verified Badge.png');

const messages = [
  {
    id: '1',
    userName: 'Valerie',
    userImg: require('../assets/images/chat/1.jpg'),
    messageTime: '8:34 am',
    messageText: 'Hello, can you specify how many people',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '2',
    userName: 'Alice',
    userImg: require('../assets/images/chat/2.jpg'),
    messageTime: '8:34 am',
    messageText: 'Ok thank you',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '3',
    userName: 'Miami F1 GP Guests',
    userImg: require('../assets/images/chat/4.jpg'),
    messageTime: '12:34 pm',
    messageText: 'Mark: That was absolutely amazing',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '4',
    userName: 'ETIHAD Ambassadors',
    userImg: require('../assets/images/chat/1.jpg'),
    messageTime: '8:34 am',
    messageText: 'You: How about next Saturday in Miami',
    unreadCount: 0,
  },
  {
    id: '5',
    userName: 'Sarrah',
    userImg: require('../assets/images/chat/1.jpg'),
    messageTime: '12:34 am',
    messageText: 'It was nice to see you yesterday',
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: '6',
    userName: 'Patrice',
    userImg: require('../assets/images/chat/1.jpg'),
    messageTime: '8:34 am',
    messageText: 'You: Nous déjeunerons à 13h concert this weekend!',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '7',
    userName: 'Anissa',
    userImg: require('../assets/images/chat/7.jpg'),
    messageTime: '8:34 am',
    messageText: 'I\'ll be at the usual table around 9pm',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '8',
    userName: 'Marcus',
    userImg: require('../assets/images/chat/m.png'),
    messageTime: '8:34 am',
    messageText: 'Let\'s catch up over coffee soon',
    unreadCount: 3,
  },
  {
    id: '9',
    userName: 'Sophia',
    userImg: require('../assets/images/chat/2.jpg'),
    messageTime: '8:34 am',
    messageText: 'Looking forward to the concert this weekend!',
    unreadCount: 0,
  },
];

const Messages: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(item =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.root}>
        <Appbar.Header style={styles.appbar}>
          <ProfilIcon />
          <Appbar.Content title="Messages" titleStyle={styles.titleCenter} />
          <BellButton />
        </Appbar.Header>
        

        
        
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          placeholderTextColor='black'
          
          theme={{
              roundness: 15,
              colors: {
                primary: '#fafafa',
                outline: '#e0e0e0',
                placeholder: '#8E8E8E',
              },
            }}
        />

        {filteredMessages.length > 0 && (
          <FlatList
            data={filteredMessages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Chat', { userId: item.id })}
                >
                  <View style={styles.messageRow}>
                    <View style={styles.avatarContainer}>
                      <Image source={item.userImg} style={styles.userImg} />
                      {item.isOnline && <View style={styles.onlineDot} />}
                    </View>

                    <View style={styles.messageContent}>
                      <View style={styles.messageHeader}>
                        <View style={styles.nameWithBadge}>
                          <Text style={styles.userName}>{item.userName}</Text>
                          <Image source={blueBadge} style={styles.blueBadge} />
                        </View>

                        {item.unreadCount > 0 && (
                          <Badge style={styles.unreadBadge}>
                            {item.unreadCount}
                          </Badge>
                        )}
                      </View>

                      <View style={styles.line}>
                        <Text
                          style={[
                            styles.messageText,
                            item.unreadCount > 0 && styles.boldText,
                          ]}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.messageText}
                        </Text>
                        <Text style={styles.messageTime}>
                          {item.messageTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <Divider style={styles.divider} />
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}

        <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  root: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  appbar: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
    justifyContent: 'space-between',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  titleCenter: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    marginTop: 18,
  },
  searchbar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#EEEEEE',
    height: 52,
      },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  userImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#232323',
  },
  nameWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blueBadge: {
    marginLeft: 6,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  messageText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#8D9199',
  },
  boldText: {
    color: '#111',
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
    color: '#8D9199',
    marginLeft: 8,
    flexShrink: 0,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  unreadBadge: {
    backgroundColor: '#FF5757',
    color: 'white',
    fontSize: 12,
    height: 22,
    minWidth: 22,
    borderRadius: 11,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 16,
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
  scrollContent: {
    paddingBottom: 100,
  },
});