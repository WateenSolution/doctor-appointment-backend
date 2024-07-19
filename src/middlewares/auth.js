const httpStatus = require("http-status");
const { config } = require("../config");
const jwt = require("jsonwebtoken");
const AuthQueries = require("../services/AuthService/AuthQueries");

const auth = async (req, res, next) => {
  try {
    let token = {};
    if (req.headers.authorization.substring(0, 6) == "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    } else {
      token = req.headers.authorization;
    }
    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret);

      const user = await AuthQueries.getUser(decoded?.user?.id);

      if (!user[0]) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
      } else {
        // req.user = decoded.user;

        req.user = user[0];
        next();
      }
    } else {
      res.json({ message: "Please Authenticate" });
    }
  } catch (error) {
    console.log(error, "middleware");
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};

// const roleBased = (allowedRoles) => {
//   return async (req, res, next) => {
//     try {
//       // Retrieve the user role from the authenticated user object
//       const userRole = req.user.role;

//       // Check if the user's role is included in the allowedRoles array
//       if (allowedRoles.includes(userRole)) {
//         // User has the required role, continue to the next middleware or route handler
//         next();
//       } else {
//         // User does not have the required role, return an unauthorized response
//         res.status(httpStatus.FORBIDDEN).json({ message: "Access denied" });
//       }
//     } catch (error) {
//       res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
//     }
//   };
// };

module.exports = auth;
