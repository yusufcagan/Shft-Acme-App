import {useQuery} from '@tanstack/react-query';
import {Job, applyJobById} from './jobService';

export const useFetchJobById = (id: string | undefined) => {
  return useQuery<Job, Error>({
    queryKey: ['job', id],
    queryFn: () => applyJobById(id),
  });
};
