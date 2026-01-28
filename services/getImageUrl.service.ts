import axios from 'axios';
import { BASE_URL_V2 } from '../configurations/url.config';

export const uploadImage = async (token: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('teams', imageFile);

    const response = await axios.post(
      `${BASE_URL_V2}/files/upload-single-file`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      // console.log('Image uploaded successfully:', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
