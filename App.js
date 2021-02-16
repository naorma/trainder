// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import styles from "./assets/styles";
import HomeScreen from "./containers/Home";
import MatchesScreen from "./containers/Matches";
import Login from "./components/Login";
import {compose} from "recompose";
import {useStore, withStore} from "./store";

function HomeNav() {
  return (
    <Text style={[styles.iconMenu, { color: iconFocused }]}>
        <Icon name="search" />
    </Text>
  );
}

function ProfileNav() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </View>
  );
}

const Tab = createBottomTabNavigator();

const App = ()=>{
    const {isSignedIn} = useStore()
  return (
      isSignedIn ? (
    <NavigationContainer  ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={ProfileNav} />
      </Tab.Navigator>
    </NavigationContainer>
      ) : <Login/>
  );
}

export default compose(withStore)(App);


