import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../Signin';
import Signup from '../Signup';

const Auth = createStackNavigator();

const AuthRotes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#312E38',
      },
    }}
  >
    <Auth.Screen component={Signin} name="Signin" />
    <Auth.Screen component={Signup} name="Signup" />
  </Auth.Navigator>
);
export default AuthRotes;
