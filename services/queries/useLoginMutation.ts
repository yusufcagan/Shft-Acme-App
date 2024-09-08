import {useMutation} from '@tanstack/react-query';
import {login} from '../authService';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: {email: string; password: string}) =>
      login(data.email, data.password),
    onSuccess: data => {
      console.log('Login successful:', data);
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
};
