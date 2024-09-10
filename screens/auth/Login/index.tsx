import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {RootStackParamList} from '../../../RootStackParamList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useLoginMutation} from '../../../services/queries/useLoginMutation';
import '../../../lang/i18n';
import {useTranslation} from 'react-i18next';

type LoginFormInput = {
  email: string;
  password: string;
};

export function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInput>();
  const {t} = useTranslation();

  const {mutateAsync, isError} = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInput> = data => {
    mutateAsync(data, {
      onSuccess: () => {
        console.log('login success:');
      },
    });
  };

  return (
    <SafeAreaView className="bg-white-100 flex-1 justify-center">
      <View className="m-5">
        <Text className="mt-2 text-4xl text-black-900 font-semibold">
          {t('welcome_screen.welcome_message')}
        </Text>
        <Text className="mt-1 text-5xl text-black-900 font-semibold">
          ACME APP
        </Text>
        {/* Email component */}
        <View className="mb-6 mt-10">
          <Text className="text-lg mb-2">{t('welcome_screen.email')}</Text>
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
          <Text className="text-lg mb-2">{t('welcome_screen.password')}</Text>
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
          <Text className="text-white text-center text-lg">
            {t('welcome_screen.login_button')}
          </Text>
        </TouchableOpacity>
        {isError && (
          <Text className="text-red-500 mt-2">
            Login failed. Please try again.
          </Text>
        )}

        {/* Create Account */}
        <View className="flex-row justify-center items-center mb-4 mt-4">
          <Text className="mr-2">{t('welcome_screen.no_account_message')}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAccount')}
          className="bg-white py-3 rounded-md mb-4 border">
          <Text className="text-black text-center text-lg">
            {t('welcome_screen.signup_button')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
