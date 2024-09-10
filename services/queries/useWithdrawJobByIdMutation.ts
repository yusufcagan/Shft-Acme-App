import {useMutation} from '@tanstack/react-query';
import {withdeawJobById} from '../jobService';

export const useWithdrawToJobById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => withdeawJobById(id),
  });
};
