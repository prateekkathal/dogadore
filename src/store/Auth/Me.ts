import Axios from "axios";
import UserApi from "../../utilities/UserApi";

const Me = async (accessToken: string) => {
  return await Axios.get(UserApi.meUrl(), {
    headers: { Authorization: "Bearer " + accessToken }
  })
    .then(response => {
      const user = response.data;

      localStorage.setItem("user", user);

      return Promise.resolve(user);
    })
    .catch(error => {
      return Promise.reject("Error getting user : " + error);
    });
};

export default Me;
