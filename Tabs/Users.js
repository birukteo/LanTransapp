// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     Dimensions,
//     Image,
//     TouchableOpacity,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
// import { FireStore } from '../FirebaseConfig';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
  
//   import { collection, getDocs } from 'firebase/firestore';
  
//   import {useIsFocused, useNavigation} from '@react-navigation/native';
//   let id = '';
//   const Users = () => {
//     const [users, setUsers] = useState([]);
//     const navigation = useNavigation();
//     const [mode, setMode] = useState('LIGHT');
//     const isFocused  = useIsFocused();
//     // useEffect(() => {
//     //   getUsers();
//     // }, []);
//     // useEffect(() => {
//     //   getMode();
//     // }, [isFocued]);
//     // const getMode = async () => {
//     //   setMode(await AsyncStorage.getItem('MODE'));
//     // };
//     // const getUsers = async () => {
//     //   id = await AsyncStorage.getItem('USERID');
//     //   let tempData = [];
//     //   const email = await AsyncStorage.getItem('EMAIL');
//     //   FireStore
//     //     .collection('users')
//     //     .where('email', '!=', email)
//     //     .get()
//     //     .then(res => {
//     //       if (res.docs != []) {
//     //         res.docs.map(item => {
//     //           tempData.push(item.data());
//     //         });
//     //       }
//     //       setUsers(tempData);
//     //     });
//     // };
//     let uid = '';
//     useEffect(() => {
//         const fetchUsers = async () => {
//           try {
//             uid = await AsyncStorage.getItem('uid');
//             const email = await AsyncStorage.getItem('email');
//             const querySnapshot = await getDocs(collection(FireStore, "users"));
            
            
//             const usersData = querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
//             const filteredUsers = usersData.filter((user) => user.uid !== uid && user.email !== email);
            
//             setUsers(filteredUsers);
//           } catch (error) {
//             console.error('Error fetching users:', error.message);
//           }
//         };
    
//         fetchUsers();
//       }, [isFocused]);
//       const navigateToChat = (selectedUser) => {
//         navigation.navigate('ChatScreen', { selectedUser });
//         console.log(selectedUser);
//       };
//     return (
//       <View
//         style={[
//           styles.container,
//           {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
//         ]}>
//         <View style={styles.header}>
//           <Text style={styles.title}> Chat Screen</Text>
//         </View>
//         <FlatList
//           data={users}
//           renderItem={({item, index}) => {
//             return (
//               <TouchableOpacity
//                 style={[styles.userItem, {backgroundColor: 'white'}]}
//                 onPress={() => navigateToChat(item)}
//                 >
//                 <Image
//                   source={require('../assets/splashscreen.png')}
//                   style={styles.userIcon}
//                 />
//                 <Text style={styles.name}>{item.email}</Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
//     );
//   };
  
//   export default Users;
//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: 'white',
//       flex: 1,
//     },
//     header: {
//       width: '100%',
//       height: 60,
//       backgroundColor: 'white',
//       elevation: 5,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     title: {
//       color: 'purple',
//       fontSize: 20,
//       fontWeight: '600',
//     },
//     userItem: {
//       width: Dimensions.get('window').width - 50,
//       alignSelf: 'center',
//       marginTop: 20,
//       flexDirection: 'row',
//       height: 60,
//       borderWidth: 0.5,
//       borderRadius: 10,
//       paddingLeft: 20,
//       alignItems: 'center',
//     },
//     userIcon: {
//       width: 40,
//       height: 40,
//     },
//     name: {color: 'black', marginLeft: 20, fontSize: 20},
//   });
import { View, Text } from 'react-native'
import React from 'react'

const Users = () => {
  return (
    <View>
      <Text>Notifications</Text>
    </View>
  )
}

export default Users