import axios from "axios";

export const sendRequestToJoin = async (token: string, formData: any) => {
  try {
    const response = await axios.post(`https://communn.io/api/v1/requests/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    return response;
  } catch (err) {
    console.log('ERR :', err);
    return { status: 500, data: [] };
  }
};