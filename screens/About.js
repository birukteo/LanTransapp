import { StyleSheet, Text, View ,Linking } from 'react-native'
import React from 'react'

const About = () => {
    const emailAddress = 'bbirukse@gmail.com';
    const telegramUsername = 'Buruk00';
    const handleEmailPress = () => {
      Linking.openURL(`mailto:${emailAddress}`);
    };
    const handleTelegramPress = () => {
        Linking.openURL(`https://t.me/${telegramUsername}`);
      };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! If you have any questions or feedback, feel free to reach out to us at:
      </Text>
      <Text style={styles.email} onPress={handleEmailPress}>
        {emailAddress}
      </Text>
      <Text style={styles.description}>You can also find us on Telegram:</Text>
      <Text style={styles.telegram} onPress={handleTelegramPress}>
        @{telegramUsername}
      </Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        backgroundColor: 'red'
      },
      description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
      },
      email: {
        color: 'blue',
        fontSize: 18,
        textDecorationLine: 'underline',
      },
      telegram: {
        color: 'blue',
        fontSize: 18,
        textDecorationLine: 'underline',
      },
});