import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FireStore } from "../FirebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Btwo = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(FireStore, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const navigateToChat = (selectedUser) => {
    
    navigation.navigate('ChatScreen', { selectedUser });
 console.log(selectedUser);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.displayName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={renderUserItem}
      />
    </View>
  );
};

export default Btwo;































// import { Ionicons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import Btn from '../src/Btn';
// import { darkGreen, green } from '../src/Constants';
// import { useFocusEffect } from "@react-navigation/native";
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
// import { FireBase_Auth, FireStore } from "../FirebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { Firestore, addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
// import LanguageItem from '../components/LanguageItem';

// const Aone = (props) => {
//   const [languagePairList, setLanguagePairList] = useState([]);

//   useEffect(() => {
//     // Initial fetch of language pairs
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(FireStore, "users"));
//       const languageList = [];
//       querySnapshot.forEach((doc) => {
//         languageList.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });
//       setLanguagePairList(languageList);
//     };

//     fetchData();

//     // Subscribe to real-time updates
//     const unsubscribe = onSnapshot(collection(FireStore, "users"), (snapshot) => {
//       const updatedLanguagePairs = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setLanguagePairList(updatedLanguagePairs);
//     });

//     return () => {
//       // Unsubscribe when the component unmounts
//       unsubscribe();
//     };
//   }, []);

//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Filter language pairs based on the search query
//     const filtered = languagePairList.filter((pair) =>
//       pair.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredLanguagePairs(filtered);
//   }, [searchQuery, languagePairList]);

//   const [filteredLanguagePairs, setFilteredLanguagePairs] = useState([]);

//   const handleDelete = async (id) => {
//     try {
//       // Remove the language pair from the local state
//       const updatedPairs = languagePairList.filter(pair => pair.id !== id);
//       setLanguagePairList(updatedPairs);

//       // Remove the language pair from Firestore
//       await deleteDoc(doc(FireStore, "users", id));
//     } catch (error) {
//       console.error('Error deleting document: ', error);
//     }
//   };

//   const renderLanguagePairItem = ({ item }) => (
//     <View style={styles.listItem}>
//       <Text style={styles.column}>{item.email}</Text>
      
//       <Pressable onPress={() => handleDelete(item.id)}>
//         <MaterialIcons name="delete" size={20} color="black" />
//       </Pressable>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.titleContainer}>
//                 <Text style={styles.titleText}> Language Pairs</Text>
//             </View>
//             <View style={styles.searchContainer}>
//                 <Ionicons name="ios-search" size={24} color="#000" style={styles.searchIcon} />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Search language pairs..."
//                     value={searchQuery}
//                     onChangeText={(text) => setSearchQuery(text)}
//                 />
//             </View>
//       <FlatList
//         data={filteredLanguagePairs}
//         keyExtractor={(item) => item.id}
//         renderItem={renderLanguagePairItem}
//       />
//       <View style={{
//         marginVertical: -70,
//         padding: 20
//       }}>
//         <Btn
//           bgColor={green}
//           textColor='white'
//           btnLabel="ADD +"
//           Press={() => props.navigation.navigate('AddPairs')}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchInput: {
//     height: 40,
//     flex:1
//     // borderColor: 'gray',
//     // borderWidth: 1,
//     // marginBottom: 16,
//     // padding: 8,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 8,
// },
// searchIcon: {
//     marginRight: 8,
// },
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   column: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   titleContainer: {
//     marginBottom: 20,
//     alignItems: 'center'
// },
// titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'red',
// },
// });

// export default Btwo;




