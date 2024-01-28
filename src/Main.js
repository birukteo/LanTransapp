import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Aone, Btwo, Profile, Translatesite, Settingdrawer } from '../screens';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { MaterialIcons } from '@expo/vector-icons';
import Users from '../Tabs/Users';


const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLable: false,
  HeaderShown: false,
  tabBarStyle: "absolute",
  bottom: 0,
  right: 0,
  left: 0,
  elevation: 0,
  height: 60,
  backgroung: "#fff"
}
const CustomTabBarIcon = (name, size, color) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};
export default function Main() {
  return (

    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Search"
        component={Aone}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="magnifying-glass" size={24} color="black" />
                <Text style={{ fontSize: 12, color: "#16247d" }}></Text>
              </View>
            )
          }
        }}
      />
      <Tab.Screen name="Translatese"
        component={Translatesite}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome name="exchange" size={24} color="black" />
                <Text style={{ fontSize: 12, color: "#16247d" }}></Text>
              </View>
            )
          }
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Users}
        options={{
          headerShown: false,
          tabBarLabel: 'notifications',
          tabBarIcon: ({ color, size }) =>
            CustomTabBarIcon('notifications', size, color),

        }}
      />
        

      <Tab.Screen
        name="Settingdrawer"
        component={Settingdrawer}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) =>
            CustomTabBarIcon('settings', size, color),
        }}
      />


    </Tab.Navigator>

  );
}