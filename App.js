import React from 'react';
import Register from './Components/Register';
import HomeScreen from './Components/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const RootStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen}/>
  </HomeStack.Navigator>
);
const RegisterStackScreen = ({navigation}) => (
  <RegisterStack.Navigator headerMode="float"> 
    <RegisterStack.Screen name="Register" component={Register}  />
  </RegisterStack.Navigator>
);

const RootStackScreen = () => (
  <RootStack.Navigator  initialRouteName="Register">
    <RootStack.Screen name="Home" component={HomeStackScreen} />
    <RootStack.Screen name="Register" component={RegisterStackScreen} />
  </RootStack.Navigator>
);
export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  )
}
