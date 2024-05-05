import { useContext } from 'react';
import { AuthContext } from 'src/providers/AuthProvider';

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return auth;
};

export default useAuth;
