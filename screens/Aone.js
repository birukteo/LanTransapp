

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Btn from '../src/Btn';
import { darkGreen, green } from '../src/Constants';
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { FireBase_Auth, FireStore } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Firestore, addDoc, collection, serverTimestamp, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import LanguageItem from '../components/LanguageItem';

const Aone = (props) => {
  const [languagePairList, setLanguagePairList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Initial fetch of language pairs
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(FireStore, "LanPair"));
      const languageList = [];
      querySnapshot.forEach((doc) => {
        languageList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setLanguagePairList(languageList);
    };

    fetchData();

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(collection(FireStore, "LanPair"), (snapshot) => {
      const updatedLanguagePairs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLanguagePairList(updatedLanguagePairs);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Filter language pairs based on the search query
    const filtered = languagePairList.filter((pair) =>
      pair.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLanguagePairs(filtered);
  }, [searchQuery, languagePairList]);

  const [filteredLanguagePairs, setFilteredLanguagePairs] = useState([]);

  const handleDelete = async (id) => {
    // setModalVisible(!modalVisible);
    try {
      // Remove the language pair from the local state
      const updatedPairs = languagePairList.filter(pair => pair.id !== id);
      setLanguagePairList(updatedPairs);

      // Remove the language pair from Firestore
      await deleteDoc(doc(FireStore, "LanPair", id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  

  const renderLanguagePairItem = ({ item }) => {
    return (
      <View style={styles.listItem}>

        <Pressable onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={20} color="red" />
        </Pressable>
        {/* <TouchableOpacity
          style={styles.menuItemLogout}
          onPress={() => setModalVisible(!modalVisible)}

        >
          <MaterialIcons name="delete" size={20} color="red" />
          {/* <Text style={styles.menuText}>Logout</Text> 
        </TouchableOpacity> */}
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
                  Are you sure you want to delete?
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
                      handleDelete(item.id)

                    }}
                  >
                    <Text style={styles.textStyle}>delete</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
     
        <Text style={styles.column}>{item.name}</Text>
        <Text style={styles.column}>{item.tran}</Text>
      
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => props.navigation.navigate("ChatScreen", { groupId: item.id })} >

          <Text style={styles.buttonlabel}>Join Exchange</Text>
        </TouchableOpacity>
      </View>
    )
  }





  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Language Pairs</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={24} color="#000" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search language pairs..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        data={filteredLanguagePairs}
        keyExtractor={(item) => item.id}
        renderItem={renderLanguagePairItem}
      />
       <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: 16,
    }}>
      <TouchableOpacity
        style={{
          backgroundColor: "#219C90",
          borderRadius: 50, // Half of the width and height to make it circular
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
        onPress={() => props.navigation.navigate('AddPairs')}
      >
        <Text style={{ color: 'white', fontSize: 16 }}> +</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  editButton: {
    width: "50%",

    backgroundColor: "green",
    height: 30,

    borderRadius: 8,

  },
  buttonlabel: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    flex: 1
    // borderColor: 'gray',
    // borderWidth: 1,
    // marginBottom: 16,
    // padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  column: {
    flex: 1,
    textAlign: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  //////////////////////////////////
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
  // menuItemLogout: {
  //   padding: 10,
  //   flexDirection: "row",
  //   gap: 10,
  //   marginTop: "5%",
  // },
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
    backgroundColor: "red",
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

export default Aone;




