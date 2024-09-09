import {useMutation, useQuery} from '@tanstack/react-query';
import {applyJobById, Job} from '../jobService';

export const useApplyToJobById = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => applyJobById(id),
  });
};
