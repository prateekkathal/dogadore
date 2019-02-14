import User from "../models/User";

const getLoggedInUser = async userTokenData => {
  return await User.findById(userTokenData)
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

export default getLoggedInUser;
