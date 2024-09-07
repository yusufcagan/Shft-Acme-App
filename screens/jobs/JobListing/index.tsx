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
import {useFetchJobList} from '../../../services/job/useJobListMutation';

export function JobList() {
  const {data, error} = useFetchJobList();
  console.log(data?.data);

  return (
    <SafeAreaView className="bg-white-100 flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <TouchableOpacity style={{transform: [{rotate: '-135deg'}]}}>
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
        renderItem={({item: job}) => <JobCard job={job} />}
      />
    </SafeAreaView>
  );
}
