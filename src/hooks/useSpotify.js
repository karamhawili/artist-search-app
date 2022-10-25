import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REACT_APP_SPOTIFY_CLIENT_ID = 'f2bc1b729c2e4681a7770dacbdc56d09';
const REACT_APP_SPOTIFY_REDIRECT_URI = 'http://localhost:3000/auth-redirect';
const REACT_APP_SPOTIFY_SCOPES = 'user-read-private user-read-email';
const BASE_API_URL = 'https://api.spotify.com/v1';

const LS_KEYS = {
  ACCESS_TOKEN: 'SPOTIFY_ACCESS_TOKEN',
  TIMESTAMP_EXPIRY: 'SPOTIFY_TOKEN_EXPIRE_TIMESTAMP',
  TOKEN_TYPE: 'SPOTIFY_TOKEN_TYPE',
};

const spotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const spotify = useProvideSpotify();

  return (
    <spotifyContext.Provider value={spotify}>
      {children}
    </spotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(spotifyContext);
};

const useProvideSpotify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExp, setTokenExp] = useState(null);

  const navigate = useNavigate();

  console.log(user, token, tokenExp);

  // ____________________________________________________________________________________________

  useEffect(() => {
    try {
      const accessToken = window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
      const timestampExpiry = parseInt(
        window.localStorage.getItem(LS_KEYS.TIMESTAMP_EXPIRY),
        10
      );

      if (accessToken && timestampExpiry) {
        setToken(accessToken);
        setTokenExp(timestampExpiry);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExp) {
      if (!user) {
        loadCurrentUser();
      } else {
        setIsLoading(false);
      }
    }
  }, [token, tokenExp, user]);

  // ____________________________________________________________________________________________

  const callEndpoint = async (path) => {
    if (hasTokenExpired()) {
      console.log('Token has expired!!!!!');
      removeToken();
      throw new Error('Token expired');
    }

    return await (
      await fetch(`${BASE_API_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      })
    ).json();
  };

  const fetchCurrentUserInfo = async () => {
    const results = await callEndpoint('/me');

    if (results.error) throw new Error('Token expired');

    return results;
  };

  const fetchSearchResults = async (query, type, limit = 20) => {
    const results = await callEndpoint(
      `/search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(
        type
      )}&limit=${encodeURIComponent(limit)}`
    );

    if (results.error) throw new Error('Token expired');

    return results;
  };

  const fetchArtistAlbums = async (artistID, limit = 50) => {
    const results = await callEndpoint(
      `/artists/${artistID}/albums?limit=${limit}`
    );

    if (results.error) throw new Error('Token expired');

    return results;
  };

  const fetchArtistInfo = async (artistID) => {
    const results = await callEndpoint(`/artists/${artistID}`);

    if (results.error) throw new Error('Token expired');

    return results;
  };

  const generateRandomString = (length) => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const login = () => {
    const popup = window.open(
      `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REACT_APP_SPOTIFY_REDIRECT_URI
      )}&scope=${encodeURIComponent(
        REACT_APP_SPOTIFY_SCOPES
      )}&response_type=token&state=${generateRandomString(
        16
      )}&show_dialog=true`,
      'Login with Spotify',
      'width=500,height=600'
    );

    window.spotifyAuthCallback = async (accessToken, expTimestamp) => {
      popup.close();

      setToken(accessToken);
      setTokenExp(expTimestamp);

      navigate('/home');
    };
  };

  const storeTokenAtRedirect = () => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));

    const accessToken = searchParams.get('access_token');
    const expiresIn = parseInt(searchParams.get('expires_in'), 10);
    const tokenType = searchParams.get('token_type');

    const timestampExpiry = Math.floor(Date.now() / 1000 + expiresIn); // In seconds.

    window.localStorage.setItem(LS_KEYS.ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(LS_KEYS.TIMESTAMP_EXPIRY, timestampExpiry);
    window.localStorage.setItem(LS_KEYS.TOKEN_TYPE, tokenType);

    window.opener.spotifyAuthCallback(accessToken, timestampExpiry);
  };

  const hasTokenExpired = () => {
    try {
      const accessToken =
        token || window.localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
      const timestampExpiry =
        tokenExp ||
        parseInt(window.localStorage.getItem(LS_KEYS.TIMESTAMP_EXPIRY), 10);

      if (!accessToken || !timestampExpiry || isNaN(timestampExpiry)) {
        return false;
      }

      return Date.now() / 1000 > timestampExpiry;
    } catch (err) {
      console.error(err);

      return true;
    }
  };

  const removeToken = () => {
    // remove all keys from local storage
    try {
      Object.values(LS_KEYS).forEach((key) => {
        window.localStorage.removeItem(key);
      });
    } catch (err) {
      console.error(err);
    }

    // set all state to null
    setUser(null);
    setToken(null);
    setTokenExp(null);
  };

  const isLoggedIn = () => {
    return !!token && !!user && !hasTokenExpired();
  };

  const loadCurrentUser = async () => {
    try {
      const user = await fetchCurrentUserInfo();
      setUser(user);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // ____________________________________________________________________________________________

  return {
    user,
    isLoading,
    login,
    isLoggedIn,
    storeTokenAtRedirect,
    fetchCurrentUserInfo,
    fetchSearchResults,
    fetchArtistAlbums,
    fetchArtistInfo,
  };
};
