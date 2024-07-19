import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export function Splash(){
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>Welcome to My App</Text>
    </View>
  );
};


