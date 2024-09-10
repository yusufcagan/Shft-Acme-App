import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Bag2, TickSquare} from 'iconsax-react-native';
import {Job} from '../../../../services/jobService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../../RootStackParamList';
import {useGetUser} from '../../../../services/queries/useGetUser';
import '../../../../lang/i18n';
import {useTranslation} from 'react-i18next';

type props = {
  job: Job;
  navigation: NativeStackNavigationProp<
    JobStackParamList,
    'JobList',
    undefined
  >;
};
const JobCard = ({job, navigation}: props) => {
  const {t} = useTranslation();
  const {data: user} = useGetUser();
  const appliedJobIds = new Set(user?.appliedJobs || []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetailScreen', {id: job.id})}
      className="bg-gray-300 rounded-2xl mx-5 my-4 p-2">
      <View className="flex-row items-center">
        <Bag2 size="40" color="#000000" />
        <View className="ml-5">
          <Text className="text-[16px] text-black-900 font-medium">{`${job?.name}`}</Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1">
            {`${t('job_listings_screen.company_name')} ${job?.companyName}`}
          </Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1 mb-1">
            {`${t('job_listings_screen.salary')} ${job?.salary}$`}
          </Text>
        </View>
        {appliedJobIds.has(job.id) && (
          <View className="absolute right-0">
            <TickSquare size="24" color="#000000" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
