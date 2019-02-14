import Axios from "axios";
import UserApi from "../utilities/UserApi";

const checkLike = async (accessToken: string, url: string) => {
  return await Axios.get(UserApi.checkLikeUrl(), {
    params: {
      url
    },
    headers: { Authorization: "Bearer " + accessToken }
  })
    .then(response => {
      return Promise.resolve(response);
    })
    .catch(error => {
      return Promise.reject(error.response);
    });
};

export default checkLike;
