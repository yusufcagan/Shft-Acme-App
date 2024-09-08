import {useQuery} from '@tanstack/react-query';
import {user, UserResponse} from '../userService';

export const useGetUser = () => {
  return useQuery<UserResponse, Error>({
    queryKey: ['user'],
    queryFn: user,
  });
};
