import User from "./../models/User";
import getLoggedInUser from "../helpers/getLoggedInUser";

export const index = async (req, res, next) => {
  const { user } = req.body.tokenData;

  getLoggedInUser(user)
    .then(loggedInUser => res.status(200).json(loggedInUser))
    .catch(e => res.status(500).json(e));
};

export const create = async (req, res, next) => {
  const { user } = req.body.tokenData;
  const { url } = req.body;

  return getLoggedInUser(user)
    .then(loggedInUser => {
      const existingLikes = loggedInUser.likes.filter((likedUrl, index) => {
        return url === likedUrl;
      });

      if (existingLikes.length) {
        return res.status(200).json({
          message: "Like Already Exists."
        });
      }

      loggedInUser.likes.push(url);
      loggedInUser.save();

      return res.status(200).json({
        message: "Successfully Added Like."
      });
    })
    .catch(e => res.status(500).json(e));
};

export const check = async (req, res, next) => {
  const { user } = req.body.tokenData;
  const { url } = req.body;
  const { query } = req;

  return getLoggedInUser(user)
    .then(loggedInUser => {
      const existingLikes = loggedInUser.likes.includes(query.url);

      let responseStatus = 404;
      let message = "Like Doesn't Exist";

      if (existingLikes) {
        responseStatus = 200;
        message = "Like Exists";
      }

      res.status(responseStatus).json({ message });
    })
    .catch(e => res.status(500).json(e));
};
