import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `http://localhost:3010/api/v1/credit`;

export const getCreditsApi = async () => {
  try {
    const requestUrl = `${backendUrl}/`;
    const response = await axios.get(requestUrl);

    return response?.data;
  } catch (error) {
    console.log(error);
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const updateCreditsApi = async ({ amountOfCredits }) => {
  try {
    const requestUrl = `${backendUrl}/`;

    const reqPayload = { amountOfCredits };

    const response = await axios.patch(requestUrl, reqPayload);

    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

// export const createCreditsApi = async () => {
//   try {
//     const requestUrl = `${backendUrl}/`;
//     const response = await axios.post(requestUrl);

//     return response?.data;
//   } catch (error) {
//     console.log(error);
//     if (error?.response) {
//       toast.error(error.response?.data?.message);
//     } else {
//       toast.error(error?.message);
//     }
//   }
// };
