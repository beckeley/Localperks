import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const usersData = {
  '1': {
    name: 'Valerie',
    role: 'WATCOAN Support Agent',
    image: require('../assets/images/chat/1.jpg'),
  },
  '2': {
    name: 'Alice',
    role: 'WATCOAN Support Agent',
    image: require('../assets/images/chat/2.jpg'),
  },
  '3': {
    name: 'Miami F1 GP Guests',
    role: 'WATCOAN Support Agent',
    image: require('../assets/images/chat/4.jpg'),

  },
};

const Chat = ({ navigation, route }: Props) => {
  const { userId } = route.params;
  const user = usersData[userId];

  // Add safety check for user
  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Text>User not found</Text>
          </Appbar.Header>
        </View>
      </SafeAreaView>
    );
  }

  const [messages, setMessages] = React.useState([
    { id: '1', type: 'received', text: 'Please share the time and place of the meeting?', isDeleted: false },
    { id: '2', type: 'sent', text: 'Meet you at 5 by the main tower', isDeleted: false },
    { id: '3', type: 'received', text: 'Deal!', isDeleted: false },
    { id: '4', type: 'sent', text: 'Thanks!', isDeleted: false },
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const [showDeletedNotification, setShowDeletedNotification] = React.useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      type: 'sent',
      text: newMessage.trim(),
      isDeleted: false,
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleLongPress = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message?.isDeleted) return;

    Alert.alert(
      'Message Options',
      '',
      [
        {
          text: 'Delete',
          onPress: () => handleDeleteMessage(messageId),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, text: 'This message was deleted', isDeleted: true }
          : msg
      )
    );
    setShowDeletedNotification(true);
    setTimeout(() => {
      setShowDeletedNotification(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Image source={user.image} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
          </View>
        </Appbar.Header>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatArea}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item.id)}
              delayLongPress={500}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.type === 'sent' ? styles.sentBubble : styles.receivedBubble,
                  item.isDeleted && styles.deletedBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.type === 'sent' ? styles.sentText : styles.receivedText,
                    item.isDeleted && styles.deletedText,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {showDeletedNotification && (
          <View style={styles.deletedNotification}>
            <Text style={styles.deletedNotificationText}>Message was deleted</Text>
          </View>
        )}

        <KeyboardAvoidingView
          style={styles.inputArea}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setNewMessage}
              value={newMessage}
              placeholder="Type a message..."
              placeholderTextColor="gray"
              multiline
            />
          </View>
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbar: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232323',
  },
  userRole: {
    fontSize: 12,
    color: '#999',
  },
  chatArea: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexGrow: 1,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '75%',
  },
  sentBubble: {
    backgroundColor: '#292D32',
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: '#EBEBEB',
    alignSelf: 'flex-start',
  },
  deletedBubble: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 15,
  },
  sentText: {
    color: '#fff',
  },
  receivedText: {
    color: '#232323',
  },
  deletedText: {
    color: '#999',
    fontStyle: 'italic',
  },
  deletedNotification: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    opacity: 0.9,
  },
  deletedNotificationText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    marginRight: 10,
    paddingRight: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});