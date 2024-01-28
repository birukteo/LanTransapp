// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// // import { createStackNavigator, useNavigation } from '@react-navigation/native';
// // import Chat from './Chat'; // Adjust the path as per your project structure

// // const Users = () => {
// //   const navigation = useNavigation();
// //   const [users, setUsers] = useState([]);
// //   const currentUserEmail = 'user@example.com'; // Replace with the current user's email

// //   useEffect(() => {
// //     // Simulate fetching users from a database
// //     const fetchedUsers = [
// //       { uid: '1', email: 'user1@example.com', username: 'User 1' },
// //       { uid: '2', email: 'user2@example.com', username: 'User 2' },
// //       // Add more users as needed
// //     ];

// //     // Filter out the current user
// //     const filteredUsers = fetchedUsers.filter((user) => user.email !== currentUserEmail);

// //     setUsers(filteredUsers);
// //   }, []);

// //   const navigateToChat = (receiverUserEmail, receiverUserID, receiverUsername) => {
// //     navigation.navigate('Chat', {
// //       receiverUserEmail,
// //       receiverUserID,
// //       receiverUsername,
// //     });
// //   };

// //   const renderUserItem = ({ item }) => (
// //     <TouchableOpacity onPress={() => navigateToChat(item.email, item.uid, item.username)}>
// //       <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
// //         <Text>{item.email}</Text>
// //       </View>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View>
// //       <FlatList
// //         data={users}
// //         keyExtractor={(item) => item.uid}
// //         renderItem={renderUserItem}
// //       />
// //     </View>
// //   );
// // };

// // export default Users;
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// const UsersNavigator = () => {
//     state = {
//         allUsers: []
//     }
//     return (
//         <View style={{ flex: 1, backgroundColor: '#000' }}>
//             <FlatList
//                 alwaysBounceVertical={false}
//                 data={this.state.allUsers}
//                 style={{ padding: 5 }}
//                 keyExtractor={(_, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={{ flexDirection: 'row' }}>
//                         <View style={{width: '12%',alignItems:'center',justifyContent:'center'}}>
//                             <Image source={{uri: ''}}/>

//                         </View>
//                         <View style={{width: '88%',alignItems:'flex-start',justifyContent:'center',marginLeft:10}}>
//                             <Text style={{color: '#fff',fontSize:16,fontWeight:'bold'}}>{item.username}</Text>
//                         </View>






//                     </TouchableOpacity>
//                 )}




//             />

//         </View>
//     )
// }

// export default UsersNavigator

// const styles = StyleSheet.create({})