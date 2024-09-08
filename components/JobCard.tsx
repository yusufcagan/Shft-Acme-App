import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Bag2} from 'iconsax-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Job} from '../services/job/jobService';
import {JobStackParamList} from '../RootStackParamList';

type props = {
  job: Job;
  navigation: NativeStackNavigationProp<
    JobStackParamList,
    'JobList',
    undefined
  >;
};
const JobCard = ({job, navigation}: props) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetailScreen', {id: job.id})}
      className="bg-gray-300 rounded-2xl mx-5 my-4 p-2">
      <View className="flex-row items-center">
        <Bag2 size="40" color="#000000" />
        <View className="ml-5">
          <Text className="text-[16px] text-black-900 font-medium">{`${job?.name}`}</Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1">
            {`Company: ${job?.companyName}`}
          </Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1 mb-1">
            {`Salary: ${job?.salary}$`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
