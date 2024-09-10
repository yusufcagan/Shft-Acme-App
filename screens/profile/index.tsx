import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useGetUser} from '../../services/queries/useGetUser';
import {Logout} from 'iconsax-react-native';
import {useAuthStore} from '../../store/authStore';
import {Controller, useForm} from 'react-hook-form';
import {useUpdateUser} from '../../services/queries/useUpdateUserMutation';
import {UpdateUserResponse} from '../../services/userService';

export default function ProfileScreen() {
  const {data: user} = useGetUser();
  const clearTokens = useAuthStore(state => state.clearTokens);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<UpdateUserResponse>({
    defaultValues: {
      name: user?.name || '',
      surname: user?.surname || '',
      profileImage: user?.profileImage || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      address: {
        details: user?.address?.details || '',
        city: user?.address?.city || '',
        country: user?.address?.country || '',
      },
    },
  });

  const updateUser = useUpdateUser();

  const onSubmit = (data: UpdateUserResponse) => {
    updateUser.mutateAsync(data);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between mb-5 m-5">
        <View className="w-[30px]" />
        <Text className="text-xl text-black-900 font-semibold">
          Profile Detail
        </Text>
        <TouchableOpacity
          onPress={() => clearTokens()}
          style={{transform: [{rotate: '-135deg'}]}}>
          <Logout size="30" color="#000000" />
        </TouchableOpacity>
      </View>
      <View className="m-5">
        <Text className="text-[16px] text-black-900 font-bold">
          Personel Information
        </Text>
        {/* Name */}
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Surname */}
        <Controller
          control={control}
          name="surname"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Surname"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Profile Image URL */}
        <Controller
          control={control}
          name="profileImage"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Profile Image URL"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Phone */}
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Phone"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Date of Birth */}
        <Controller
          control={control}
          name="dateOfBirth"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Date of Birth (DD-MM-YYYY)"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />
      </View>

      {/* Address Section */}
      <View className="m-5">
        <Text className="text-[16px] text-black-900 font-bold">Address</Text>

        {/* Country */}
        <Controller
          control={control}
          name="address.country"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Country"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* City */}
        <Controller
          control={control}
          name="address.city"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="City"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Address */}
        <Controller
          control={control}
          name="address.details"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Address"
              value={value}
              onChangeText={onChange}
              className="bg-white p-3 rounded border-2 border-gray-800 mt-2"
            />
          )}
        />

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-black p-4 rounded mt-4 w-2/3 self-center">
          <Text className="text-white text-center font-bold">Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
