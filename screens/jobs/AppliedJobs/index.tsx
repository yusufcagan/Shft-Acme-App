import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {useGetUser} from '../../../services/user/useGetUser';

export function AppliedJobScreen() {
  const {data: user} = useGetUser();
  console.log(user);
  return (
    <SafeAreaView>
      <Text>index</Text>
    </SafeAreaView>
  );
}
