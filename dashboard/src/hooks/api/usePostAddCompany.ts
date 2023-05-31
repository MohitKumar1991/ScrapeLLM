import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';
import { Company } from '@/interfaces';

interface AddCompanyResult {
  status: string;
  company: Company
}

interface AddCompanyError {
  error: string;
}

const endPoint = 'add-company';

const usePostAddCompany = (
  company_name: string,
  company_url: string,
  enabled:boolean = true
): UseQueryResult<AddCompanyResult, AddCompanyError> => {
  return useQuery({
    queryKey: ['usePostAddCompany', company_name],
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/${endPoint}`, { company_url, company_name });
      return data.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default usePostAddCompany;
