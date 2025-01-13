
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      router.push('/login'); 
    }
  }, [router]);
};

export default useAuth;
