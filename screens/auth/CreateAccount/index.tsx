import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {RootStackParamList} from '../../../RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeft} from 'iconsax-react-native';
import {useRegisterMutation} from '../../../services/queries/useRegisterMutation';

type RegisterInput = {
  email: string;
  password: string;
};

export function CreateAccount({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterInput>();

  const {mutate} = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterInput> = data => {
    mutate(data, {
      onSuccess: () => {
        Alert.alert(
          'Registration Successful',
          'Your account has been created, you can now log in.',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      },
      onError: (error: any) => {
        Alert.alert(
          'Registration Failed.',
          `An error occurred during registration, please try again. -"${error.response?.data?.message}"`,
          [{text: 'Ok'}],
          {cancelable: false},
        );
      },
    });
  };

  return (
    <SafeAreaView className="bg-white-100 flex-1 ">
      <View className="m-5 mt-12">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center">
          <ArrowLeft size="32" color="#000" />
        </TouchableOpacity>
        <Text className="mt-2 text-3xl text-black-900 font-semibold">
          Create Accounts
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
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
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
            <Text className="text-red-500 mt-1">{errors.password.message}</Text>
          )}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-black py-3 rounded-md mb-4">
          <Text className="text-white text-center text-lg">Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
