import 'react-native-gesture-handler';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './src/routes';
import { AuthProvider } from './src/context/auth';
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer >
    </NativeBaseProvider>
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
