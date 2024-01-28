import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SavedScreen from './screens/SavedScreen';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import colors from './utils/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './src/Login';
import Signup from './src/Signup';
import Main from './src/Main';
import Addpairs from './screens/Addpairs';
import { Btwo, Profile } from './screens';
import Lan from './src/Lan';
import EditProfile from './screens/EditProfile';
import About from './screens/About';
import ChatScreen from './screens/ChatScreen';
import Users from './Tabs/Users';


// import AsyncStorage from '@react-native-async-storage/async-storage';
// AsyncStorage.clear();

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'medium',
          color: 'white'
        },
        headerStyle: {
          backgroundColor: colors.primary
        }
      }}>
      <Tab.Screen
        name="Login"
        component={Login}

        options={{
          // headerShown: false,
          headerTitle: "Login",
          tabBarLabel: "Login",
          tabBarIcon: (props) => <Ionicons name="person" size={props.size} color={props.color} />
        }} />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: " Translate",
          tabBarLabel: "Home",
          tabBarIcon: (props) => <Entypo name="home" size={props.size} color={props.color} />
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerTitle: " Translate",
          tabBarLabel: "Saved",
          tabBarIcon: (props) => <Entypo name="star" size={props.size} color={props.color} />
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: " Translate",
          tabBarLabel: "Clear",
          tabBarIcon: (props) => <Ionicons name="close-circle" size={props.size} color={props.color} />
        }}
      />

    </Tab.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default function App() {

  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setAppIsLoaded(true);
      }
    };

    prepare();

  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{ flex: 1 }}>
          <Stack.Navigator
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'medium',
                color: 'white'
              },
              headerStyle: {
                backgroundColor: colors.primary
              }
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="main"
                component={TabNavigator}
                options={{
                  headerTitle: "Translate",
                  headerShown: false
                }}
              />
            </Stack.Group>

            <Stack.Group
              screenOptions={{
                presentation: 'containedModal',
                headerStyle: {
                  backgroundColor: 'white'
                },
                headerTitleStyle: {
                  color: colors.textColor,
                  fontFamily: 'medium'
                }
              }}
            >
              <Stack.Screen
                name="languageSelect"
                component={LanguageSelectScreen}
              />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="AddPairs" component={Addpairs} />
              {/* <Stack.Screen name="Chat" component={Chat} /> */}
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
              <Stack.Screen name="Btwo" component={Btwo} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Lan" component={Lan} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="About" component={About} />
              <Stack.Screen name="Users" component={Users} />
              <Stack.Screen name="Main" component={Main} options={{
                tabBarIcons: ({ focuser }) => {
                  <View style={{ alignItems: "center", justifyContent: "center" }}></View>
                }
              }}
              />
            </Stack.Group>

          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
