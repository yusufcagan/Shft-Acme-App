import {useMutation} from '@tanstack/react-query';
import {userUpdate, UserResponse} from '../userService';

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: userUpdate,
    onSuccess: data => {
      console.log('User updated successfully:', data);
    },
    onError: error => {
      console.error('Error updating user:', error);
    },
  });
};
