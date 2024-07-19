import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';

const IntroScreen = ({ onContinue }) => (
  <View style={styles.introContainer}>
    <Text style={styles.introTitle}>CROP WATCH</Text>
    <Text style={styles.introText}>
    Empowering farmers with cutting-edge technology for real-time pest detection and effective crop protection. Let's safeguard your harvest together!
    </Text>
    <Button 
    color="green"
    title="Start" 
    onPress={onContinue} 
    />
  </View>
);

export function Intro({ navigation }) {
  const [showIntro, setShowIntro] = useState(true);

  const handleContinue = () => {
    setShowIntro(false);
    //change the next line to login page
    navigation.navigate('Home'); // Navigate to the Heatmap screen
  };

  if (showIntro) {
    return <IntroScreen onContinue={handleContinue} />;
  }

  return (
    
    <View style={styles.container}>
      {/* Your existing main content here */}
     <Button title="HomeScreen"
      color="green"
      onPress={()=>{
      navigation.navigate("Home")
     
     }}/>

     <Button title="Heatmap"
      color="green"
      onPress={()=>{
      navigation.navigate("Heatmap")
     }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"green"
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },

});
