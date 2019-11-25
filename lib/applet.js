// Packages
const queryString = require("query-string");
const axios = require("axios");

/**
 * @name Applet
 * @description Prototype for applet setting
 * @param {Object} params
 * @param {Function} callback
 * */

/* Example
 * authfy.use(new TwitterApplet(
 *   {
 *     clientID: "*******",
 *     clientSecret: "********",
 *     callbackURL: "http://localhost:8000/oauth/twitter/callback"
 *   },
 *   (profile, done) => {
 *
 *   }
 * ))*/
class Applet {
  constructor(params, callback) {
    this.name = null;
    this.versionAPI = "1.0.0";
    this.params = params;
    this.callback = callback;
    this.steps = {
      authorize: {
        url: null,
        queries: {}
      },
      tokens: {
        url: null,
        queries: {}
      },
      account: {
        url: null,
        queries: {}
      }
    };
  }

  /**
   * @name Get Tokens
   * @description Is is step to get some tokens for next step => getAccount
   * @return {object}
   * */
  async getTokens() {
    return null;
  }

  /**
   * @name Get Account
   * @description Finally step to get data account
   * @return {object}
   * */
  async getAccount() {
    return null;
  }

  async _createStepUrl(nameStep) {
    const { url, queries } = this.steps[String(nameStep)];
    const stringQueries = queryString.stringify(queries, {
      arrayFormat: "comma"
    });
    const resultURL = `${url}?${stringQueries}`;

    return resultURL;
  }



  async _requestToService(url, config = {}) {
    try {
      const response = await axios.get(decodeURI(url), config);
      const data = await response.data;

      return data;
    } catch (e) {
      throw e;
    }
  }

  async _builderObjectAccount(data) {
    return null;
  }
}

module.exports = Applet;
