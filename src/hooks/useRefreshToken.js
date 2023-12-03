
import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const {auth} = useAuth();

  // console.log(setAuth);
  const refresh = async () => {

      // console.log(")LD--> ",auth.accessToken.accessToken);
      const response = await axios.post('/api/auth/refresh',{refreshToken: auth.accessToken.refreshToken}, {
          withCredentials: true
      });
      setAuth(prev => {
          return { ...prev, accessToken: response.data }
      });
      // console.log(")LD--> ",response.data.accessToken);
      return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken