import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';

interface WriteEmailResult {
  email: string;
}

interface WriteEmailError {
  error: string;
}

interface WriteEmailRequestBody {
  subject: string;
  company: string;
  ownCompanyAbout: string
}

const endPoint = 'generate-email';

const useWriteEmail = (
  {
    subject,
    company,
    ownCompanyAbout
  }: WriteEmailRequestBody,
  enabled: boolean,
): UseQueryResult<WriteEmailResult, WriteEmailError> => {
  return useQuery({
    queryKey: [
      'usePostWriteEmail',
      subject,
      company,
      ownCompanyAbout
    ],
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/${endPoint}`, {
        subject,
        company,
        own_company_info: ownCompanyAbout,
      });
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default useWriteEmail;
