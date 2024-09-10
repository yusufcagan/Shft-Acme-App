import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import {useGetUser} from '../../../services/queries/useGetUser';
import JobCard from './components/JobCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../RootStackParamList';
import '../../../lang/i18n';
import {useTranslation} from 'react-i18next';

export function AppliedJobScreen({
  navigation,
}: NativeStackScreenProps<JobStackParamList, 'AppliedJobScreen'>) {
  const {t} = useTranslation();

  const {data: user} = useGetUser();
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row self-center mb-5 m-5">
        <Text className="text-xl text-black-900 font-semibold">
          {t('applied_jobs_screen.title')}
        </Text>
      </View>
      <FlatList
        data={user?.appliedJobs}
        renderItem={({item: id}) => <JobCard id={id} navigation={navigation} />}
      />
    </SafeAreaView>
  );
}
