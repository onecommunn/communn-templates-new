import { AuthContext, IAuthContext } from "@/contexts/Auth.context";
import { uploadImage } from "@/services/getImageUrl.service";
import { useContext } from "react";

export const useUpload = () => {
  const { getAccessToken } = useContext<IAuthContext>(AuthContext);

  const uploadImages = async (imageFiles: File[]) => {
    try {
      const token = getAccessToken();
      const uploadPromises = imageFiles.map((imageFile) =>
        uploadImage(token, imageFile),
      );
      const responses = await Promise.all(uploadPromises);

      return responses;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  return {
    uploadImages
  };
};
