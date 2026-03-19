import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;