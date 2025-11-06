import { BASE_URL } from '@/configurations/url.config';
import axios from 'axios';


export const logoutService = async (): Promise<boolean> => {
  try {
    const deviceToken = localStorage.getItem('deviceToken');
    const accessToken = localStorage.getItem('access-token');

    if (!accessToken) {
      console.error('No access token found in local storage.');
      return false;
    }

    const requestBody: any = {};
    if (deviceToken) {
      requestBody.notificationToken = deviceToken;
    } else {
      console.warn('No device token found, proceeding with logout without it.');
    }

    const response = await axios.post(`${BASE_URL}/logout`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: false,
    });

    if (response.status === 200) {
      localStorage.clear();
      sessionStorage.clear();

      document.cookie = 'authToken=; Max-Age=0; path=/';

      window.location.href = '/login';

      return true;
    } else {
      console.error('Logout failed:', response.data);
      return false;
    }
  } catch (error) {
      console.error('Error during logout:', error)
    return false;
  }
};
