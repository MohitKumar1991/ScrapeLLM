import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';

interface SendOtpResult {
  email: string;
}

interface SendOtpError {
  error: string;
}

const endPoint = 'api/v1/user/sendOtp';

const useSendOtp = (
  email: string,
  enabled: boolean,
): UseQueryResult<SendOtpResult, SendOtpError> => {
  return useQuery({
    queryKey: ['sendOtp', email],
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/${endPoint}`, { email });
      return data.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default useSendOtp;
