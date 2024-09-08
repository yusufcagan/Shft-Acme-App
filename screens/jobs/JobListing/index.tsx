import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import {Logout, SearchNormal1} from 'iconsax-react-native';
import JobCard from './components/JobCard';
import {useGetJobList} from '../../../services/job/useGetJobList';
import {useAuthStore} from '../../../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../RootStackParamList';

export function JobList({
  navigation,
}: NativeStackScreenProps<JobStackParamList, 'JobList'>) {
  const {data, error} = useGetJobList();
  const clearTokens = useAuthStore(state => state.clearTokens);

  return (
    <SafeAreaView className="bg-white-100 flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <TouchableOpacity
          onPress={() => clearTokens()}
          style={{transform: [{rotate: '-135deg'}]}}>
          <Logout size="30" color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl text-black-900 font-semibold">Job List</Text>
        <View className="w-[30px]" />
      </View>
      <View className="bg-gray-200 flex justify-center">
        <View className="m-5 flex-row border border-gray-800 p-2 rounded-md items-center">
          <SearchNormal1 size="14" color="#000000" />
          <TextInput placeholder="Search" className="ml-2" />
        </View>
      </View>
      <FlatList
        data={data?.data}
        renderItem={({item: job}) => (
          <JobCard job={job} navigation={navigation} />
        )}
        keyExtractor={item => String(item.id!)}
      />
    </SafeAreaView>
  );
}
