import express from "express";
import { configDotenv } from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import morgan from "morgan";

const app = express();
configDotenv();

app.get("/", (req, res) => {
  res.send("Server is Okay!");
});

app.use(morgan("dev"));
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (_, __, profile, done) => {   
      return done(null, profile);
    },
  ),
);  

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
    res.send("Google authentication successfull");
  },
);

export default app;
