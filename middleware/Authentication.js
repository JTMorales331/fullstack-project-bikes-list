import "dotenv/config"
import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      // 401 code error = Unauthorized
      return res.status(401).json({ error: "Invalid auth header" })
    }

    // We have to put Bearer but we gotta extract it
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token" })
    }

    // verify token via jwt then put it in req.user
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded;
    
    // go to the next if not error
    next()
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ jwt_error: err.message })
    }
    return res.status(500).send({ message: "server error: ", err })
  }
}