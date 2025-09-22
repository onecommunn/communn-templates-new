'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { IAddUser } from '../models/user.model';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

interface ApiResponse {
  user: {
    token?: {
      accessToken: string;
      refreshToken: string;
    };
    [key: string]: any;
  };
  adminCommunities?: Array<{
    community: {
      _id: string;
    };
  }>;
}

interface User {
  [key: string]: any;
}

const setTokens = ({ accessToken, refreshToken }: any) => {
  if (
    accessToken &&
    accessToken !== null &&
    accessToken !== undefined &&
    accessToken !== ''
  ) {
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
  }
};

const setCommunityTols = (communityId: any) => {
  localStorage.setItem('communityId', communityId);
};

const getTokens = () => {
  return {
    accessToken: localStorage.getItem('access-token'),
    refreshToken: localStorage.getItem('refresh-token'),
  };
};

const removeTokens = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('community');
};

const purgeStoredState = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const BASE_URL = 'https://communn.io/api/v1';

interface UserResponseData {
  user?: {
    token?: {
      accessToken: string;
      refreshToken: string;
    };
    firstName?: string;
    lastName?: string;
    emailId?: string;
    phoneNumber?: number;
    id?: string;
    [key: string]: any;
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  firstName?: string;
  lastName?: string;
  emailId?: string;
  phoneNumber?: number;
  id?: string;
  [key: string]: any;
}

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [roleType, setRoleType] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [community] = useState<string | null>(null);
  const intervalId = useRef<any>(null);
  const isInitialized = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUserData = useCallback(async (token: string) => {
    try {
      if (!token) {
        // console.log('No token provided to fetchUserData');
        setLoading(false);
        return;
      }

      setLoading(true);
      // console.log('Fetching user data with token:', token);

      try {
        const userResponse = await axios.get<UserResponseData>(
          `${BASE_URL}/auth/get-user-by-token`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        // console.log('User response:', userResponse.data);

        // Handle both cases: user data directly in response or nested under user property
        const userData = userResponse.data?.user || userResponse.data;
        if (userData) {
          const userWithoutToken = { ...userData };
          delete userWithoutToken.token;
          
          // Update all states in a single batch
          setUser(userWithoutToken);
          setIsAuthenticated(true);
          setAccessToken(token);
          
          // console.log('Auth state updated:', {
          //   user: userWithoutToken,
          //   isAuthenticated: true,
          //   token
          // });
        } else {
          // console.log('No user data in response:', userResponse.data);
          // Check if token is still valid
          try {
            const decoded: { exp: number } = jwtDecode(token);
            const remainingTime = decoded.exp - ((Date.now() / 1000) | 0);
            // console.log('Token expiration check:', {
            //   remainingTime,
            //   isExpired: remainingTime < 0
            // });
            
            if (remainingTime < 0) {
              // console.log('Token is expired, clearing auth state');
              removeTokens();
              setUser(null);
              setIsAuthenticated(false);
              setAccessToken(null);
            } else {
              // console.log('Token is valid but no user data, might be an API issue');
              setUser(null);
              setIsAuthenticated(false);
              setAccessToken(null);
            }
          } catch (decodeError) {
            // console.error('Error decoding token:', decodeError);
            removeTokens();
            setUser(null);
            setIsAuthenticated(false);
            setAccessToken(null);
          }
        }
      } catch (apiError: any) {
        console.error('API Error:', {
          status: apiError.response?.status,
          data: apiError.response?.data,
          message: apiError.message
        });
        
        if (apiError.response?.status === 401) {
          // console.log('Token is invalid or expired, clearing auth state');
          removeTokens();
        }
        
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
      }
    } catch (error) {
      // console.error('Error in fetchUserData:', error);
      setUser(null);
      setIsAuthenticated(false);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyToken = useCallback(async (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const remainingTime = decoded.exp - ((Date.now() / 1000) | 0);
      
      if (remainingTime < 100) {
        // console.log('Token expired, clearing interval');
        clearInterval(intervalId.current);
        getNewToken();
      } else {
        if (!isAuthenticated || !user) {
          // console.log('Token valid but no user data, fetching user data');
          await fetchUserData(token);
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setUser(null);
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [isAuthenticated, user, fetchUserData]);

  const getNewToken = useCallback(() => {
    setLoading(false);
  }, []);

  // Initial load - check for token in URL or localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized.current) {
        // console.log('Auth already initialized');
        return;
      }
      
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const token = params?.get('token') || localStorage.getItem('access-token');

        // console.log('Initializing auth with token:', token ? 'Token exists' : 'No token');

        if (token) {
          if (params.get('token')) {
            console.log('Setting tokens from URL params');
            setTokens({ accessToken: token, refreshToken: token });
          }
          
          await fetchUserData(token);
        } else {
          // console.log('No token found, clearing auth state');
          setUser(null);
          setIsAuthenticated(false);
          setAccessToken(null);
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
      } finally {
        setLoading(false);
        isInitialized.current = true;
      }
    };

    initializeAuth();
  }, [fetchUserData]);

  // Handle route changes and page reloads
  useEffect(() => {
    const handleRouteChange = () => {
      const token = localStorage.getItem('access-token');
      // console.log('Route change detected, checking token:', token ? 'Token exists' : 'No token');
      
      if (token && (!isAuthenticated || !user)) {
        // console.log('Token exists but no user data, fetching user data');
        fetchUserData(token);
      }
    };

    // Handle page reloads
    window.addEventListener('load', handleRouteChange);
    
    // Handle route changes using pathname
    handleRouteChange();

    return () => {
      window.removeEventListener('load', handleRouteChange);
    };
  }, [pathname, isAuthenticated, user, fetchUserData]);

  // Token verification interval
  useEffect(() => {
    if (accessToken) {
      // console.log('Setting up token verification interval');
      clearInterval(intervalId.current);
      verifyToken(accessToken); // Initial verification
      intervalId.current = setInterval(() => {
        verifyToken(accessToken);
      }, 1000 * 60); // Check every minute
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [accessToken, verifyToken]);

  const getAccessToken = useCallback(() => {
    return accessToken ?? '';
  }, [accessToken]);

  const getCommunity = useCallback(() => {
    return community ?? localStorage.getItem('community') ?? '';
  }, [community]);

  const autoLogin = useCallback(async (phoneNumber: string, emailId: string) => {
    try {
      // console.log('Starting autoLogin with:', { phoneNumber, emailId });
      
      const response = await axios.post<ApiResponse>(
        `${BASE_URL}/auth/autoLogin`,
        {
          phoneNumber,
          emailId,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      // console.log('AutoLogin API Response:', response.data);
      
      if (response.status === 200) {
        const { user } = response.data;
        // console.log('User data from response:', user);
        
        const tokens = user?.token;
        // console.log('Tokens from response:', tokens);
        
        if (tokens) {
          setTokens(tokens);
          setAccessToken(tokens.accessToken || null);
          setRefreshToken(tokens.refreshToken || null);
        }
        
        setIsAuthenticated(true);
        
        const OnlyUser = { ...user };
        delete OnlyUser['token'];
        // console.log('Setting user state with:', OnlyUser);
        setUser(OnlyUser);
      }
      return response;
    } catch (err: any) {
      // console.log('AutoLogin error:', err);
      setIsAuthenticated(false);
      //return err?.response ? err?.response : err;
    }
  }, []);

  const autoCreate = useCallback(async (formData: IAddUser) => {
    try {
      const response = await axios.post<ApiResponse>(
        `${BASE_URL}/auth/autoCreate`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        const { user, adminCommunities } = response.data;
        const tokens = user?.token;
        
        if (tokens) {
          setTokens(tokens);
          setAccessToken(tokens.accessToken || null);
          setRefreshToken(tokens.refreshToken || null);
        }
        
        if (adminCommunities?.[0]?.community._id) {
          setCommunityTols(adminCommunities[0].community._id);
        }
        
        setIsAuthenticated(true);
        
        const OnlyUser = { ...user };
        delete OnlyUser['token'];
        setUser(OnlyUser);
      }

      return response;
    } catch (err) {
      setIsAuthenticated(false);
      return err;
    }
  }, []);

  // Log state changes
  useEffect(() => {
    // console.log('useAuth State Update:', {
    //   loading,
    //   user: user ? 'User exists' : 'No user',
    //   isAuthenticated,
    //   accessToken: accessToken ? 'Token exists' : 'No token'
    // });
  }, [loading, user, isAuthenticated, accessToken]);

  return {
    loading,
    user,
    isAuthenticated,
    getAccessToken,
    getCommunity,
    autoLogin,
    autoCreate,
    roleType,
  };
};


