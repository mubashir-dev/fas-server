const authService = require("../services/auth.service");
const apiResponse = require("../utils/response.util");
const { Encryption } = require("../utils/hashing.util");
const jwtService = require("../services/jwt.service");
const emailService = require("../services/email.service");
const serializationService = require("../services/serialization.service");
const ObjectId = require("mongoose").Types.ObjectId;

//login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //query user
    const userExists = await authService.find({ email: email });
    if (!userExists) {
      return apiResponse.notFound(res, "Account doen't found in the database");
    }

    //check if account is suspeneded
    if (userExists.status == "suspended") {
      return apiResponse.unauthorizedResponse(
        res,
        "Account is suspended,Contact Support"
      );
    }

    //compare password with hash
    let passwordCompared = await Encryption.compare(
      password,
      userExists.password
    );

    if (!passwordCompared) {
      return apiResponse.unauthorizedResponse(
        res,
        "Credentials are may not be correct"
      );
    }

    //user playload
    const userData = {
      id: userExists._id,
      name: userExists.name,
      role: userExists.role,
    };

    //access-token & refresh-token
    const [accessToken, refreshToken] = await Promise.all([
      jwtService.signAccessToken(userData),
      jwtService.signARefreshToken(userData),
    ]);

    //serilizing data
    const data = serializationService.serilizeUser(
      accessToken,
      refreshToken,
      userData
    );
    return apiResponse.successData(res, "successfully logged in", data);
  } catch (error) {
    next(error);
  }
};

//refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshtoken } = req.body;
    const loggedUser = await jwtService.verifyRefreshToken(refreshtoken);
    const [accessToken, refreshToken] = await Promise.all([
      jwtService.signAccessToken(loggedUser),
      jwtService.signARefreshToken(loggedUser),
    ]);

    //serilizing data
    const data = serializationService.serilizeUser(
      accessToken,
      refreshToken,
      loggedUser
    );

    return apiResponse.successData(
      res,
      "successfully generated refresh tokens",
      data
    );
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await authService.find({ _id: ObjectId(id) });
    // //serialized user data
    const serializedUserData = serializationService.serializeCurrentUser(user);
    return apiResponse.successData(
      res,
      "current logged in user",
      serializedUserData
    );
  } catch (error) {
    next(error);
  }
};
