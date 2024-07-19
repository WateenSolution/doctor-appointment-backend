const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");

const TokenService = {
  generateToken: async (type, user, secret = config.jwt.secret) => {
    const payload = {
      type,
      user,
    };
    return jwt.sign(payload, secret);
  },
  verifyToken: (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new Error("Token not found");
      } else {
        // if everything is good, save to request for use in other routes
        return decoded;
      }
    });

    return payload;
  },

  generateAuthTokens: async (user) => {
    const accessToken = await TokenService.generateToken(
      tokenTypes.ACCESS,
      user
    );
    return accessToken;
  },
};

module.exports = TokenService;
