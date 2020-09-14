import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function HomeScreen(props) {
  const [getValue, setGetValue] = useState('');
  getData = async () => {
    let value_ = await AsyncStorage.getItem('key');
    setGetValue(value_) ;
  };
  useEffect(() => {
    getData();
  });
  return (
    <View>
      <TouchableOpacity onPress ={getData}>  
        <Text>
          Hi
          <Text style={{fontStyle:'italic',fontWeight:  'bold' }}>
            {getValue}
          </Text> 
          You are Logged in !
        </Text>
      </TouchableOpacity> 
    </View>
  );
}