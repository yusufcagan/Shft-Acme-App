import {useMutation, useQuery} from '@tanstack/react-query';
import {jobList, JobResponse} from './jobService';

export const useFetchJobList = () => {
  return useQuery<JobResponse, Error>({
    queryKey: ['jobs'],
    queryFn: jobList,
  });
};
