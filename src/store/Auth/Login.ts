import Axios from "axios";
import UserApi from "../../utilities/UserApi";
import Me from "./Me";

const Login = async (username: string, password: string) => {
  return await Axios.post(UserApi.loginUrl(), {
    username,
    password
  })
    .then(async response => {
      const { accessToken, expiresIn } = response.data;

      if (!accessToken) {
        return Promise.reject(response.data);
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiresIn", expiresIn);

      return await Me(accessToken)
        .then(user => {
          return user;
        })
        .catch(error => error);
    })
    .catch(error => {
      const { data } = error.response;

      if (data && data.name && data.name === "ValidationError") {
        const message = [];

        for (const key in data.errors) {
          if (key) {
            message.push(data.errors[key].message);
          }
        }

        return Promise.reject(message.join(", "));
      }

      return Promise.reject(data.errors.message);
    });
};

export default Login;
