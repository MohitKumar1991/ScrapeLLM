import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';

interface WriteEmailResult {}

interface WriteEmailError {
  error: string;
}

interface WriteEmailRequestBody {
  subject: string;
  company: string;
  emailFormat: string
}

const endPoint = 'api/v1/user/details';

const useWriteEmail = (
  {
    subject,
    company,
    emailFormat
  }: WriteEmailRequestBody,
  enabled: boolean,
): UseQueryResult<WriteEmailResult, WriteEmailError> => {
  return useQuery({
    queryKey: [
      'userDetails',
      subject,
      company,
      emailFormat
    ],
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/${endPoint}`, {
        subject,
        company,
        emailFormat,
      });
      return data.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default useWriteEmail;
