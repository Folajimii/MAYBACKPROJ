import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // access authorize header to vaildate request
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    //retrieve the token for the logged in user and verify
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    //send the verified user to his destination
    next();
  } catch (error) {
    res.status(403).json({ error: "Authentication failed" });
  }
};
