import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {ArrowLeft, Bag2} from 'iconsax-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../RootStackParamList';
import {useGetJobById} from '../../../services/queries/useGetJobById';
import {useApplyToJobById} from '../../../services/queries/useApplyToJobByIdMutation';
import {useGetUser} from '../../../services/queries/useGetUser';
import {useWithdrawToJobById} from '../../../services/queries/useWithdrawJobByIdMutation';
import {useQueryClient} from '@tanstack/react-query';
import '../../../lang/i18n';
import {useTranslation} from 'react-i18next';

export function JobDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<JobStackParamList, 'JobDetailScreen'>) {
  const {t} = useTranslation();

  const {id} = route.params;
  const {data: job} = useGetJobById(id);

  const {data: user} = useGetUser();
  const appliedJobIds = new Set(user?.appliedJobs || []);

  const ApplyJob = useApplyToJobById();
  const WithdrawJob = useWithdrawToJobById();
  const queryClient = useQueryClient();

  const handleApplyJob = () => {
    ApplyJob.mutateAsync(id, {
      onSuccess: () => {
        queryClient.clear();
        console.log('success apply');
      },
    });
  };

  const handleWithdrawJob = () => {
    WithdrawJob.mutateAsync(id, {
      onSuccess: () => {
        queryClient.clear();
        console.log('success withdraw');
      },
    });
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="30" color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl text-black-900 font-semibold">
          {t('job_detail_screen.title')}
        </Text>
        <View className="w-[30px]" />
      </View>
      <View className="bg-gray-300 m-5 rounded-[20px] items-center p-5">
        <Bag2 size="40" color="#000000" />
        <Text className="text-xl text-black-900 font-bold">
          {t('job_detail_screen.job_name')}
        </Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`${t(
          'job_detail_screen.company',
        )} ${job?.companyName}`}</Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`${t(
          'job_detail_screen.location',
        )} ${job?.location}`}</Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`${t(
          'job_detail_screen.salary',
        )} ${job?.salary}$`}</Text>
        <Text className="text-[15px] text-black-900 font-bold mt-2">{`${t(
          'job_detail_screen.keywords',
        )}`}</Text>
        <View className="flex-row flex-wrap mt-2">
          {job?.keywords.map((j, index) => (
            <View
              key={index}
              className="bg-white border-2 border-gray-800 p-1 ml-1">
              <Text className="text-[15px] text-black-900 font-bold">{j}</Text>
            </View>
          ))}
        </View>
        <Text className="text-[15px] text-black-900 font-bold mt-2">{`${t(
          'job_detail_screen.job_description',
        )}`}</Text>
        <View className="bg-white border-2 border-gray-800 p-2 m-4">
          <Text className="text-[15px] text-black-900 font-bold mt-2">
            {job?.description}
          </Text>
        </View>
        {appliedJobIds.has(job?.id!) ? (
          <TouchableOpacity
            onPress={handleWithdrawJob}
            className="bg-white p-3 border-2 rounded-md mb-4 w-2/3 items-center">
            <Text className="text-black text-[17px] font-bold mx-2">
              {t('job_detail_screen.withdraw_button')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleApplyJob}
            className="bg-black p-3 rounded-md mb-4 w-2/3 items-center">
            <Text className="text-white text-[17px] font-bold mx-2">
              {t('job_detail_screen.apply_button')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
