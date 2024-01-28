

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FireBase_Auth, FireStore } from '../FirebaseConfig';
import { addDoc, doc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';

// Sample data for chat messages
const messages = [
  { id: '1', sender: 'user', text: 'Hello!' },
  { id: '2', sender: 'other', text: 'Hi there!' },
  // Add more messages as needed
];

const ChatScreen = ({ route }) => {
  const { groupId } = route.params;
  // State to manage the text input
  const [messages, setMessages] = useState();
  const [group, setGroup] = useState();
  const [messageInput, setMessageInput] = useState('');
  const { currentUser } = FireBase_Auth


  /// Fetch Clubs Data
  useEffect(() => {
    const clubRef = doc(FireStore, `LanPair/${groupId}`);
    const unsubscribe = onSnapshot(clubRef, (docSnap) => {
      setGroup({ id: docSnap.id, ...docSnap.data() });
    });
    return () => unsubscribe();
  }, []);



  useEffect(() => {
    const q = query(
      collection(FireStore, `LanPair/${groupId}/conversations`),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (docSnap) => {
      const data = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    });

    return () => unsubscribe();

  }, [groupId]);

  /// Send Messages
  const sendMessage = async () => {
    setMessageInput("");
    const msg = messageInput.trim();
    if (msg.length === 0) return;
    const docRef = collection(FireStore, `LanPair/${groupId}/conversations`);
    try {
      const docSnap = await addDoc(docRef, {
        message: messageInput,
        sender: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      console.log("message sent successfully.");
    } catch (error) {
      console.log(error);
    }
    // if (ref.current) {
    //   ref.current.scrollToEnd({ animated: true });
    // }
  };

  //// Jions clubs
  const joinClubs = async () => {

    try {
      const clubsRef = doc(FireStore, `LanPair/${groupId}`);
      await updateDoc(clubsRef, {
        members: arrayUnion(currentUser?.uid)
      });
      console.log("Joined  successfully.");
    } catch (error) {
      console.error("Error  to join", error);
    }

  };

  const renderMessage = ({ item }) => {
    const myMessage = item.sender === currentUser?.uid;
    return (
      <View
        style={[
          styles.messageContainer,
          myMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      {/* Chat messages */}
      <FlatList

        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}

      />

      {/* Message input field and send button */}
      {group?.members !== null &&
        group?.members?.includes(currentUser?.uid) ?
        (<View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageInput}
            onChangeText={(text) => setMessageInput(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>) : 
        <TouchableOpacity
        style={styles.joinButton}
        onPress={() => joinClubs()}
      >
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end', // Chat messages at the bottom
  },
  joinButton: {
    backgroundColor: '#3498db', // Example background color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  
  buttonText: {
    color: 'white', // Example text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  userMessage: {
    alignSelf: 'flex-end', // Align user messages to the right
    backgroundColor: '#DCF8C6', // Light green background for user messages
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  otherMessage: {
    alignSelf: 'flex-start', // Align other messages to the left
    backgroundColor: '#E5E5EA', // Light gray background for other messages
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF', // Blue color for the send button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#dcf8c9",
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#ddd",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
