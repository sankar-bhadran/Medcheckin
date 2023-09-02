import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  // const token = req.cookies.Token;
  const token = req.headers.cookie;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied...No token provided..." });
  }
  try {
    const newtoken=token.split('=')[1]
    console.log(newtoken);
    const decoded = jwt.verify(newtoken, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.user = decoded._id;
    console.log(req.user);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(400).json({ message: "Invalid Token" });
  }
};
