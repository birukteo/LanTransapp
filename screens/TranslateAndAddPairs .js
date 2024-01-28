import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { FireStore } from '../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const TranslateAndAddPairs = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [name, setName] = useState('');
  const [tran, setTran] = useState('');
  useEffect(() => {
    // Fetch language pairs from Firebase Firestore when the component mounts
    fetchLanguagePairs();
  }, []);

  const addLanguagePair = async () => {
    // Your existing code for adding language pairs to Firestore
    // ...

    // You may also want to trigger translation here if needed
    // For example, call a function like translateText(name) here
    console.log(name, tran);
            try {
                // Replace 'your-collection' with the actual name of your Firestore collection
                const collectionRef = collection(FireStore, 'LanPair');
                const docRef = await addDoc(collectionRef, {
    
                    name: name,
                    tran: tran,
    
                });
    
                console.log('Document written with ID: ', docRef.id);
                setName("");
                setTran("");
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        
  };

  const translateText = async (text) => {
    // Your existing code for translating text using axios
    // ...

    // Set the translated text state
    // setTranslatedText(response.data.translatedText);
  };

  const handleTranslateAndAddPairs = () => {
    // Ensure both inputs are not empty before proceeding
    if (!inputText.trim() || !name.trim() || !tran.trim()) {
      Alert.alert('Error', 'Inputs cannot be empty');
      return;
    }

    // Call translation function
    translateText(inputText);

    // Call function to add language pairs to Firestore
    addLanguagePair();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android Translate</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text for translation"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        multiline
      />

      <TouchableOpacity
        onPress={handleTranslateAndAddPairs}
        style={{
          backgroundColor: '#2BB789',
          borderRadius: 100,
          alignItems: 'center',
          width: 300,
          paddingVertical: 5,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: '#006A42', fontSize: 25, fontWeight: 'bold' }}>Translate</Text>
      </TouchableOpacity>

      {/* Your existing code for language pairs */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add Language Pairs</Text>
      </View>
      <TextInput
                style={styles.input}
                placeholder="Enter text for Input 1"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.conta}>
                <Ionicons name="ios-arrow-down" size={24} color="black" />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter text for Input 2"
                value={tran}
                onChangeText={(text) => setTran(text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={addLanguagePair}>
                <Text style={styles.addButtonLabel}>ADD</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 30,
    color: '#fff',
    marginTop: 100
  }, dropdowncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }, dropdown: {
    backgroundColor: '#fff',
    width: 200,

    marginTop: 50,
    color: '#fff'
  },
  input: {
    height: 60,
    width: '100%',
    color: '#2BB789',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    padding: 10,
    marginTop: 100
  }, buttontext: {
    color: '#2BB789',
    fontSize: 20,
    fontWeight: 'bold'

  }, button: {
    backgroundColor: '#2BB789',
    width: 200, 
    height: 50,
    marginTop: 50,
    borderRadius:10,
    justifyContent:'center',
    alignItems: 'center'
  },title2: {
    fontWeight:'bold',
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
    marginTop:50
  },text: {
    color: '#fff',
    fontSize: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
titleContainer: {
    marginBottom: 20, // Adjust the margin as needed
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red', // Set your desired text color
  },
conta: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0', // Set your desired background color
  },
input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
},
addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
},
addButtonLabel: {
    color: 'white',
    fontSize: 18,
}, container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titleContainer: {
        marginBottom: 20, // Adjust the margin as needed
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red', // Set your desired text color
      },
    conta: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0', // Set your desired background color
      },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    addButtonLabel: {
        color: 'white',
        fontSize: 18,
    },
});

export default TranslateAndAddPairs;
