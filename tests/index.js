const express = require("express");
const app = express();
const axios = require("axios");
const Authfy = require("../index");
const authfy = new Authfy();

const VKApplet = require("./VKApplet");
const JWTVerify = require("./JWTVerify");

authfy.verify(
  new JWTVerify({ secret: { accessToken: "fs5fsf454dsrtbt45v6" } })
);

authfy.use(
  new VKApplet(
    {
      clientID: "7202273",
      clientSecret: "hzuXZysDTecD3o4xvTuU",
      callbackURL: "http://localhost:3000/vk/callback",
      scope: ["email", "friends", "photos"],
      fields: [
        "id",
        "first_name",
        "last_name",
        "email",
        "nickname",
        "status",
        "bdate",
        "city",
        "phone",
        "photo_400_orig",
        "sex",
        "screen_name"
      ]
    },
    async (accessToken, refreshToken, data) => {
      try {

        console.log(data)
        return {
          id: data.id
        };
      } catch (e) {
        throw e;
      }
    }
  )
);

app.get("/vk", authfy.try("VK", { display: "popup" }));

app.get("/vk/callback", authfy.finally("VK"));

app.listen(3000);
