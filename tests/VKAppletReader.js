const AppletReader = require("../lib/applet.reader");

class VKAppletReader extends AppletReader {
  constructor() {
    super({
      first_name: "names.givenName",
      last_name: "names.familyName",
      posts: {
        name: "posts",
        paths: {
          name: "title"
        }
      }
    });
  }
}

const reader = new VKAppletReader();

reader
  .convert({
    first_name: "Aleksandr",
    last_name: "Sadov",
    posts: [{ name: "hello" }]
  })
  .then(data => console.log(data));
