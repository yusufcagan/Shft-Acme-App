import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Bag2} from 'iconsax-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../../RootStackParamList';
import {useGetJobById} from '../../../../services/queries/useGetJobById';
import '../../../../lang/i18n';
import {useTranslation} from 'react-i18next';

type props = {
  id: string;
  navigation: NativeStackNavigationProp<
    JobStackParamList,
    'AppliedJobScreen',
    undefined
  >;
};
const JobCard = ({id, navigation}: props) => {
  const {t} = useTranslation();

  const {data: job} = useGetJobById(id);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetailScreen', {id: id})}
      className="bg-gray-300 rounded-2xl mx-5 my-4 p-2">
      <View className="flex-row items-center">
        <Bag2 size="40" color="#000000" />
        <View className="ml-5">
          <Text className="text-[16px] text-black-900 font-medium">{`${job?.name}`}</Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1">
            {`${t('applied_jobs_screen.company_name')}${job?.companyName}`}
          </Text>
          <Text className="text-[12px] text-gray-500 font-medium mt-1 mb-1">
            {`${t('applied_jobs_screen.salary')}${job?.salary}$`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
