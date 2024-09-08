import {useMutation} from '@tanstack/react-query';
import {register} from '../authService';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: {email: string; password: string}) =>
      register(data.email, data.password),
    onSuccess: data => {
      console.log('Register successful:', data);
    },
    onError: error => {
      console.error('Register failed:', error);
    },
  });
};
