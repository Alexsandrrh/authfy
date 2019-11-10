const { getDomain } = require("./request");

class Authfy {
  constructor(options = { mode: "production" }) {
    // config
    this.applets = {};
    this.options = options;
    this.verifySchema = null;
  }

  /**
   * @name use
   * @description add new applet in config
   * @param {Object} applet
   * */
  use(applet) {
    this.applets[applet.name] = applet;
  }

  /**
   * @name connect
   * @param {String} nameApplet
   * @return {Function}
   * */

  /* Example */
  try(nameApplet, params = {}) {
    // Get current applet
    const applet = this.applets[nameApplet];

    // Set new params to current applet
    applet.params = { ...applet.params, ...params };

    return async (req, res) => {
      const redirectUrl = await applet._createStepUrl("authorize");
      res.redirect(redirectUrl);
    };
  }

  /**
   * @name finally
   * @param {String} nameApplet
   * @param {Object} params
   * @return {Function}
   * */

  /* Example
   *
   * Get url callback
   * app.get('/oauth/twitter/callback', authfy.finally("Twitter")
   *
   * http://localhost:8000/oauth/twitter/callback?code=************
   * That middleware read query and running next steps and return data
   *
   * */
  finally(nameApplet) {
    // Get current applet
    const applet = this.applets[nameApplet];

    // return middleware
    return async (req, res) => {
      try {
        // Get query code
        const { code } = req.query;
        const tokens = await applet.getTokens(code);
        const account = await applet.getAccount(tokens);

        res.status(200).json(await this.verifySchema.convert(account));
      } catch (e) {
        res.status(500).send(e.toString());
      }
    };
  }

  /**
   * @name verify
   * @param {Object}
   * */
  verify(verifySchema) {
    // Registred verifySchema
    this.verifySchema = verifySchema;
  }
}

module.exports = Authfy;
