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
import {BottomTabParamList, RootStackParamList} from './RootStackParamList';
import {CreateAccount} from './screens/auth/CreateAccount';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useAuthStore} from './store/authStore';
import {JobStack} from './screens/jobs/JobStack';
import {AppliedJobScreen} from './screens/jobs/AppliedJobs';
import ProfileScreen from './screens/profile';
import {ActivityIndicator, SafeAreaView} from 'react-native';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const loadTokens = useAuthStore(state => state.loadTokens);
  const token = useAuthStore(state => state.accessToken);
  const [isloading, setIsLoading] = useState(true);

  const queryClient = new QueryClient();

  useEffect(() => {
    const loadAppTokens = async () => {
      await loadTokens();
      setIsLoading(false);
    };

    loadAppTokens();
  }, [loadTokens]);

  if (isloading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

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
