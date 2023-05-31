import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';
import { Company } from '@/interfaces';

interface useGetCompanies {
  companies: Company[];
}

interface useGetCompaniesError {
  error: string;
}

const endPoint = 'get-companies';

const useGetCompanies = (
  enabled: boolean=true,
): UseQueryResult<useGetCompanies, useGetCompaniesError> => {
  return useQuery({
    queryKey: ['useGetCompanies'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/${endPoint}`);
      console.log("Returned from axios", data);
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default useGetCompanies;
