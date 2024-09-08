import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JobList} from './JobListing';
import {JobDetailScreen} from './JobDetails';
import {JobStackParamList} from '../../RootStackParamList';

export function JobStack() {
  const JobStack = createNativeStackNavigator<JobStackParamList>();
  return (
    <JobStack.Navigator screenOptions={{headerShown: false}}>
      <JobStack.Screen name="JobList" component={JobList} />
      <JobStack.Screen name="JobDetailScreen" component={JobDetailScreen} />
    </JobStack.Navigator>
  );
}
