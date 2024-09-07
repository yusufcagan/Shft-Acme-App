/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from './screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList';
import {CreateAccount} from './screens/auth/CreateAccount';
import {JobList} from './screens/jobs/JobListing';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useAuthStore} from './store/authStore';
import {JobStack} from './screens/jobs/JobStack';
import {AppliedJobScreen} from './screens/jobs/AppliedJobs';
import ProfileScreen from './screens/profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const token = useAuthStore(state => state.accessToken);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {token ? (
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="JobStack" component={JobStack} />
            <Tab.Screen name="AppliedJobScreen" component={AppliedJobScreen} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
