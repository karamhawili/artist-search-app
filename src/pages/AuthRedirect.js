import React, { useEffect } from 'react';
import { useSpotify } from '../hooks/useSpotify';

const AuthRedirect = () => {
  const { storeTokenAtRedirect } = useSpotify();

  useEffect(() => {
    storeTokenAtRedirect();
  }, []);

  return <p>Redirecting you to home page...</p>;
};

export default AuthRedirect;
