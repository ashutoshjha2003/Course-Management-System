import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';

const useUser = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 

  // useQuery hook from react-query to fetch user data
  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/user/${user?.email}`); 
        return res.data; 
      } catch (error) {
        throw new Error(`Error fetching user data: ${error.message}`);
      }
    },
    enabled: !!user?.email && !!localStorage.getItem('token'), 
  });

  return { currentUser, isLoading, refetch };1
};

export default useUser;
