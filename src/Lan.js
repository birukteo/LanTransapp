
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Background from './Background';
import { green } from './Constants';
import { useRoute } from '@react-navigation/native';
const Lan = (props) => {
  // const route = useRoute();
  // const { selectedUser } = route.params;
  // console.log(selectedUser)
  const handlePress = () => {
    // Handle button press logic here
    props.navigation.navigate("Main");
  };

  return (
    <Background>
      <View style={styles.container}>
      <Text
            style={{
              color: '#F1F7B5',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Language Exchanging 
          </Text>
          <Text
            style={{
              color: '#F1F7B5',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
         Application
          </Text>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Improve Your</Text>
          <Text style={styles.heroSubtitle}>Favorite Language</Text>
          <Text style={styles.heroSub}>With Natives</Text>
          <Text
            style={{
              color: '#F1F7B5',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
              marginVertical:100
            }}>
            Learn language for free by  
          </Text>
          <Text
            style={{
              color: '#F1F7B5',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
              paddingLeft:100
            }}>
            chatting
          </Text>
          <Text
            style={{
              color: '#F1F7B5',
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
             with natives around the world 
          </Text>
       
        </View>
       
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  title: {
    color: 'red',
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF6969',
    paddingLeft:40
  },
  heroSubtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FF6969',
   
   
  },
  heroSub: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FF6969',
    paddingLeft:50
   
  },

  button: {
    backgroundColor: '#2BB789',
    borderRadius: 100,
    alignItems: 'center',
    width: 300,
    paddingVertical: 5,
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontSize: 25, fontWeight: 'bold'
  },
  
  
});

export default Lan;
