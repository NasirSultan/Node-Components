import jwt from 'jsonwebtoken';


const user = {
  id: 1,
  username: "testuser",
  password: "1234"
};


export function login(req, res) {
  const { username, password } = req.body;

  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: user.id, fresh: true },
    process.env.ACCESS_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ accessToken, refreshToken });
}


export function refreshToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Missing refresh token" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, fresh: false },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
}


export function protectedRoute(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);
    res.json({ message: "Access granted!", userId: payload.id, fresh: payload.fresh });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired access token" });
  }
}




export function getUserData(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const payload = jwt.verify(token, process.env.ACCESS_SECRET);


    const userData = {
      id: payload.id,
      username: "testuser",
      email: "test@example.com",
      fresh: payload.fresh
    };

    res.json({ message: "User data", user: userData });

  } catch (err) {
    return res.status(403).json({ message: "Access token invalid or expired" });
  }
}
