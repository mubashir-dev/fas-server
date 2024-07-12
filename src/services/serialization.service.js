exports.serilizeUser = (accessToken, refreshToken, user) => {
  const data = {
    tokenType: "Bearer",
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: process.env.JWT_TIMEOUT_DURATION,
    user: user,
  };
  return data;
};

exports.serializeCurrentUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
