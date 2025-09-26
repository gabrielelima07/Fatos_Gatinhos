
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import { StyleSheet } from 'react-native';
import { ExpoConfig } from 'expo';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2500); // 2.5s splash
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {showSplash ? <SplashScreen /> : <HomeScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
