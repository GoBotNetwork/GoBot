import { Router } from "express";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { toGoUser } from "../db/entities/GoUser";
import { CLIENT_ID, CLIENT_SECRET, FRONTEND_URL } from "../utils/constants";

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await toGoUser(id as string);
  done(null, user);
});

export const authRouter = Router();

passport.use(
  new DiscordStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scope: ["identify", "guilds"]
    },
    async (accessToken, _refreshToken, profile, done) => {
      const goUser = await toGoUser(profile.id);
      if (goUser.accessToken !== accessToken) {
        goUser.accessToken = accessToken;
        goUser.save();
      }

      done(null, profile.id);
    }
  )
);

authRouter.get("/", passport.authenticate("discord"));

authRouter.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: `${FRONTEND_URL}/dashboard`,
  }),
  (_req, res) => {
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);