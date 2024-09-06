/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLogin ? (
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
