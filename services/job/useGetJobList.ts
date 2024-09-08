import {useQuery} from '@tanstack/react-query';
import {jobList, JobResponse} from './jobService';

export const useGetJobList = () => {
  return useQuery<JobResponse, Error>({
    queryKey: ['jobs'],
    queryFn: jobList,
  });
};
