import Axios from "axios";
import UserApi from "./../utilities/UserApi";

const createLike = async (accessToken: string, url: string) => {
  return await Axios.post(
    UserApi.createLikeUrl(),
    {
      url
    },
    {
      headers: { Authorization: "Bearer " + accessToken }
    }
  )
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      return Promise.reject("Error getting user : " + error);
    });
};

export default createLike;
