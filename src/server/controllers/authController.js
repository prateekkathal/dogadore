import User from "./../models/User";
import { APP_KEY } from "babel-dotenv";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createErrorMessage = message => {
  return {
    errors: { message }
  };
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  return await User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json(createErrorMessage("User Not Found."));
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(404)
          .json(createErrorMessage("Password doesn't match."));
      }

      return res.status(200).json(createToken(user));
    })
    .catch(e => res.status(500).json(e));
};

export const signUp = async (req, res, next) => {
  return await User.init().then(() => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(500).json(createErrorMessage("Invalid Request"));
    }

    const hash = bcrypt.hashSync(password, 10);

    req.body.password = hash;

    User.create(req.body)
      .then(user => {
        if (!user) {
          return res
            .status(500)
            .json(createErrorMessage("Error Creating User."));
        }

        return res.status(200).json(createToken(user));
      })
      .catch(e => res.status(500).json(e));
  });
};

export const me = async (req, res, next) => {
  const { user } = req.body.tokenData;

  return await User.findById(user)
    .then(user => {
      if (!user) {
        return res.status(404).json(createErrorMessage("User Not Found."));
      }

      return res.status(200).json(user);
    })
    .catch(e => res.status(500).json(e));
};

export const logout = (req, res, next) => {
  res.status(200).json({
    message: "Logged Out Succesfully."
  });
};

const createToken = user => {
  const accessToken = jwt.sign(
    {
      user: {
        _id: user["_id"]
      }
    },
    "dogadore",
    { expiresIn: 3600 }
  );

  return {
    accessToken,
    expiresIn: 3600
  };
};
