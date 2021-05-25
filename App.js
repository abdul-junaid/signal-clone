import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/LoginScreen';
import {RegisterScreen} from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import CreateChatScreen from './screens/CreateChatScreen'
import ChatScreen from './screens/ChatScreen'

export default function App() {

  const Stack = createStackNavigator()
  const globalScreenOptions = {
    headerStyle: { backgroundColor: '#007fff' },
    headerTitleAlign: 'center',
    headerTintColor: '#ffffff'
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateChat" component={CreateChatScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
      <StatusBar style='light' />
    </NavigationContainer>
  );
}
