import express from "express";
import session from "express-session";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  
}));


const user = {
  username: "admin",
  password: "1234"
};


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    req.session.user = { username };
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});


app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.json({ message: `Welcome ${req.session.user.username}` });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});


app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out" });
  });
});




app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
