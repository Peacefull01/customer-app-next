// hooks/useAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage (or cookies)
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);
};

export default useAuth;
