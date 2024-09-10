import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Logout, SearchNormal1} from 'iconsax-react-native';
import JobCard from './components/JobCard';
import {useGetJobList} from '../../../services/queries/useGetJobList';
import {useAuthStore} from '../../../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../RootStackParamList';
import '../../../lang/i18n';
import {useTranslation} from 'react-i18next';

export function JobList({
  navigation,
}: NativeStackScreenProps<JobStackParamList, 'JobList'>) {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [searchField] = useState<string | undefined>('companyName');
  const {t} = useTranslation();

  const {
    data: jobData,
    isLoading,
    isFetching,
  } = useGetJobList(
    page,
    perPage,
    searchQuery ? searchField : undefined,
    searchQuery || undefined,
  );
  const clearTokens = useAuthStore(state => state.clearTokens);
  const handleLoadMore = () => {
    if (!isFetching && jobData?.data?.length! > 0) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (query: string | undefined) => {
    setSearchQuery(query);
    setPage(1);
  };
  return (
    <SafeAreaView className="bg-white-100 flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <TouchableOpacity
          onPress={() => clearTokens()}
          style={{transform: [{rotate: '-135deg'}]}}>
          <Logout size="30" color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl text-black-900 font-semibold">
          {t('job_listings_screen.title')}
        </Text>
        <View className="w-[30px]" />
      </View>
      <View className="bg-gray-200 flex justify-center">
        <View className="m-5 flex-row border border-gray-800 p-2 rounded-md items-center">
          <SearchNormal1 size="14" color="#000000" />
          <TextInput
            placeholder={t('job_listings_screen.search_placeholder')}
            className="ml-2"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={jobData?.data}
        renderItem={({item: job}) => (
          <JobCard job={job} navigation={navigation} />
        )}
        keyExtractor={item => String(item.id!)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.01}
        ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
