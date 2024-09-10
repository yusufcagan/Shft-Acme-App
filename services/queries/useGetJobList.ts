import {useQuery} from '@tanstack/react-query';
import {jobList, JobResponse} from '../jobService';

export const useGetJobList = (
  page: number,
  perPage: number,
  searchField?: string,
  searchQuery?: string,
) => {
  return useQuery<JobResponse, Error>({
    queryKey: ['jobs', page, perPage, searchField, searchQuery],
    queryFn: () => jobList(page, perPage, searchField, searchQuery),
  });
};
