import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <SafeAreaView className="bg-white-100 flex-1 justify-center">
      <View className="m-5">
        <Text className="font-poppins mt-2 text-4xl text-black-900 font-semibold">
          Welcome,
        </Text>
        <Text className="font-poppins mt-1 text-5xl text-black-900 font-semibold">
          ACME APP
        </Text>
        {/* Email component */}
        <View className="mb-6 mt-10">
          <Text className="text-lg mb-2">Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="border border-gray-400 p-2 rounded-md"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="hr@shft.co"
                keyboardType="email-address"
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text className="text-red-500 mt-1">This is required.</Text>
          )}
        </View>

        {/* Password Field */}
        <View className="mb-6">
          <Text className="text-lg mb-2">Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="border border-gray-400 p-2 rounded-md"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="******"
                secureTextEntry
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text className="text-red-500 mt-1">Password is required.</Text>
          )}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-black py-3 rounded-md mb-4">
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>

        {/* Create Account */}
        <View className="flex-row justify-center items-center mb-4 mt-4">
          <Text className="mr-2">Don't have an account?</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')}
          className="bg-white py-3 rounded-md mb-4 border">
          <Text className="text-black text-center text-lg">Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
