


import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { FireStore } from "../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

const Addpairs = () => {
    const [name, setName] = useState("");
    const [tran, setTran] = useState("");

    const addLanguagePair = async () => {
        if (!name.trim() || !tran.trim()) {
            // Display an alert if either input is empty
            Alert.alert("Error", "Inputs cannot be empty");
            return;
        }

        try {
            // Replace 'your-collection' with the actual name of your Firestore collection
            const collectionRef = collection(FireStore, 'LanPair');
            const docRef = await addDoc(collectionRef, {
                name: name,
                tran: tran,
                members:[]
            });

            console.log('Document written with ID: ', docRef.id);
            setName("");
            setTran("");
            Alert.alert("Success", "Language pair added successfully!");
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert("Error", "An error occurred while adding the language pair.");
        }

    };

    return (
        <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Add Language Pairs</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter language input"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Ionicons name="ios-arrow-forward" size={24} color="black" style={styles.arrowIcon} />
        <TextInput
          style={styles.input}
          placeholder="Enter language output"
          value={tran}
          onChangeText={(text) => setTran(text)}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addLanguagePair}>
        <Text style={styles.addButtonLabel}>ADD</Text>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      titleContainer: {
        marginBottom: 20,
      },
      titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       marginVertical: 50
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
      },
      arrowIcon: {
        marginLeft: 10,
      },
      addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      addButtonLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default Addpairs;







