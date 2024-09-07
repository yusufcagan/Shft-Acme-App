import {View, Text} from 'react-native';
import React from 'react';
import {Bag2} from 'iconsax-react-native';
import {Job} from '../../../../services/job/jobService';

type props = {
  job: Job;
};
const JobCard = ({job}: props) => {
  return (
    <View className="bg-gray-300 rounded-2xl mx-5 my-4 p-2">
      <View className="flex-row items-center">
        <Bag2 size="40" color="#000000" />
        <View className="ml-5">
          <Text className="text-lg text-black-900 font-medium">{`${job?.name}`}</Text>
          <Text className="text-l text-gray-500 font-medium mt-1">
            {`Company: ${job?.companyName}`}
          </Text>
          <Text className="text-l text-gray-500 font-medium mt-1 mb-1">
            {`Salary: ${job?.salary}$`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
