import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axiosHelper';
import { API_URL } from '@/constants/api';

interface VerifyOtpResult {
  token: string;
  user: any;
}

interface VerifyOtpError {
  error: string;
}

const endPoint = 'api/v1/user/verifyOtp';

const useVerifyOtp = (
  email: string,
  otp: string,
  enabled: boolean,
): UseQueryResult<VerifyOtpResult, SendOtpError> => {
  return useQuery({
    queryKey: ['verifyOtp', otp],
    queryFn: async () => {
      const { data } = await axios.post(`${API_URL}/${endPoint}`, { email, otp });
      return data.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60,
    retry: false,
    enabled,
  });
};

export default useVerifyOtp;
