const Verify = require("../lib/verify");
const jwt = require("jsonwebtoken");

class JWTVerify extends Verify {
  constructor(options) {
    super(options);
  }

  async convert(data) {
    const { secret } = this.options;
    const { accessToken } = secret;

    return {
      accessToken: jwt.sign({ userID: data.id, iat: Date.now() }, accessToken)
    };
  }
}

module.exports = JWTVerify;
