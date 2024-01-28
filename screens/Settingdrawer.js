import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Iconsetting from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FireBase_Auth, FireStore } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc,getDoc,addDoc, collection, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth"

//import { FireBase_Auth } from "../FirebaseConfig";
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';




const Settingdrawer = (props) => {
  const [dark, setDark] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");

  const[data,setData]=useState("");
  
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FireBase_Auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          email: user.email || "",
          displayname: user.displayName || "",
          imageurl: user.photoURL || "",
          uid: user.uid,
        };
        setData(userData);
        //console.log(userData)
      } else {
        // No user is signed in
        // Handle the case where the user is not logged in
      }
    });

    return () => unsubscribe();
  }, [FireBase_Auth]);

  const toggleSwitch = () => {
    setDark((prev) => !prev);
  };
  const navigation = useNavigation();

  const handleLogout = async () => {
    setModalVisible(!modalVisible);
    try {
      await signOut(FireBase_Auth);
      navigation.navigate('Login');
    
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.log(error)
    }
  };
  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(FireBase_Auth, data.email);
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.log(error);
      alert('Error sending password reset email.');
    }
  };
   
  return (
    <View style={styles.container}>
      <View style={styles.ProfileZone}>
      {data && (
          <Image
          source={{
            uri: `${data.imageurl}`,
          }}
            height={100}
            width={100}
            borderWidth={4}
            borderRadius={10000}
            borderColor={"#ccc"}
          />
        )}
        <Text style={styles.ProfileZoneText}>{data.displayname}</Text>
 
      </View>
      
      <View style={styles.Separator}></View>

      <View style={styles.settingMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.menuText}>Profile</Text>
          <Icon
            style={styles.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Text style={styles.menuText}>Edit Profile</Text>
          <Icon
            style={styles.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}
        onPress={handleChangePassword}>
          
          <Text style={styles.menuText}>Change Password</Text>
          <Icon
            style={styles.menuItemIcon}
            name="navigate-next"
            color={"black"}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.Separator}></View>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#000", true: "#ffff" }}
            thumbColor={dark ? "#000" : "#fff"}
            onValueChange={toggleSwitch}
            value={dark}
            style={styles.togglebtn}
          ></Switch>
        </View>
        <TouchableOpacity style={styles.menuItem}
         onPress={() => {
          navigation.navigate("About");
        }}>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        <View style={styles.Separator}></View>

        <TouchableOpacity
          style={styles.menuItemLogout}
          onPress={()=>setModalVisible(!modalVisible)}

        >
          <Iconsetting name="logout" color={"black"} size={30} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Are you sure you want to logout?
                </Text>
                <View style={styles.modalBtns}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonLogout]}
                    onPress={() => {
                      handleLogout()
                     
                    }}
                  >
                    <Text style={styles.textStyle}>Logout</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    height: "100%",
  },
  ProfileZone: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-around',
    // borderBottomColorColor: "red",
    // borderWidth: 1,
  },
  ProfileZoneText: {
    fontSize: 24,
    marginLeft: "10%",
  },
  settingMenu: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
  },
  menuItemIcon: {
    marginLeft: "auto",
  },
  menuItemLogout: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    marginTop: "5%",
  },
  Separator: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
  },
  togglebtn: {
    marginLeft: "auto",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: "20%",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: "auto",
    paddingHorizontal: 20,
  },

  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonLogout: {
    backgroundColor: "darkblue",
  },
  textStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,

    textAlign: "center",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
export default Settingdrawer;
 

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Settingdrawer = () => {
//   return (
//     <View>
//       <Text>Settingdrawer</Text>
//     </View>
//   )
// }

// export default Settingdrawer

// const styles = StyleSheet.create({})

// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const SettingDrawer = ({ navigation }) => {
//   const settingsData = [
//     { id: '1', title: 'Profile', onPress: () => navigation.navigate('Profile') },
//     { id: '2', title: 'Dark Mode', onPress: () => console.log('Toggle Dark Mode') },
//     // Add more settings as needed
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.settingItem} onPress={item.onPress}>
//       <Text style={styles.settingText}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={settingsData}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   settingItem: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   settingText: {
//     fontSize: 16,
//   },
// });

// export default SettingDrawer;
