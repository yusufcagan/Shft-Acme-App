import {useMutation} from '@tanstack/react-query';
import {applyJobById} from '../jobService';

export const useApplyToJobById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => applyJobById(id),
  });
};
