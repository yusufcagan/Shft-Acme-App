import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {ArrowLeft, Bag2} from 'iconsax-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {JobStackParamList} from '../../../RootStackParamList';
import {useGetJobById} from '../../../services/queries/useGetJobById';

export function JobDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<JobStackParamList, 'JobDetailScreen'>) {
  const {id} = route.params;
  const {data: job} = useGetJobById(id);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="30" color="#000000" />
        </TouchableOpacity>
        <Text className="text-xl text-black-900 font-semibold">Job Detail</Text>
        <View className="w-[30px]" />
      </View>
      <View className="bg-gray-300 m-5 rounded-[20px] items-center p-5">
        <Bag2 size="40" color="#000000" />
        <Text className="text-xl text-black-900 font-bold">Job Name</Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`Company: ${job?.companyName}`}</Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`Location: ${job?.location}`}</Text>
        <Text className="text-[13px] text-black-900 font-semibold mt-2">{`Salary: ${job?.salary}$`}</Text>
        <Text className="text-[15px] text-black-900 font-bold mt-2">{`Keyword:`}</Text>
        <View className="flex-row flex-wrap mt-2">
          {job?.keywords.map((j, index) => (
            <View
              key={index}
              className="bg-white border-2 border-gray-800 p-1 ml-1">
              <Text className="text-[15px] text-black-900 font-bold">{j}</Text>
            </View>
          ))}
        </View>
        <Text className="text-[15px] text-black-900 font-bold mt-2">{`Job Description`}</Text>
        <View className="bg-white border-2 border-gray-800 p-2 m-4">
          <Text className="text-[15px] text-black-900 font-bold mt-2">
            {job?.description}
          </Text>
        </View>
        <TouchableOpacity className="bg-black p-3 rounded-md mb-4 w-1/3 items-center">
          <Text className="text-white text-[17px] font-bold mx-2">Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
