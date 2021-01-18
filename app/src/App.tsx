import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView } from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312E38" />
      <SafeAreaView style={{ backgroundColor: '#312E38', flex: 1 }}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};
export default App;
