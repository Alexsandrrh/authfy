const Applet = require("../lib/applet");

class VKApplet extends Applet {
  constructor(params, callback) {
    super(params, callback);
    this.name = "VK";
    this.versionAPI = "5.103";
    this.steps = {
      authorize: {
        url: "https://oauth.vk.com/authorize/",
        queries: {
          client_id: params.clientID,
          redirect_uri: params.callbackURL,
          response_type: "code",
          scope: params.scope || [],
          display: params.display || "page",
          v: this.versionAPI
        }
      },
      tokens: {
        url: "https://oauth.vk.com/access_token/",
        queries: null
      },
      account: {
        url: "https://api.vk.com/method/users.get",
        queries: {
          v: this.versionAPI,
          fields: params.fields || []
        }
      }
    };
  }

  async getTokens(code) {
    try {
      const nameStep = "tokens";
      const tokens = this.steps[nameStep];
      const { clientID, clientSecret, callbackURL } = this.params;
      tokens.queries = {
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: callbackURL
      };

      const resultURL = await this._createStepUrl(nameStep);
      const data = await this._requestToService(resultURL);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getAccount(tokensData) {
    try {
      const nameStep = "account";

      const { user_id, access_token, email } = tokensData;

      const account = this.steps[nameStep];
      account.queries.user_ids = user_id;
      account.queries.access_token = access_token;

      const resultURL = await this._createStepUrl(nameStep);
      const { response } = await this._requestToService(resultURL);
      const data = await this._builderObjectAccount({ ...response[0], email });

      return (await this.callback(access_token, "", data)) || {};
    } catch (e) {
      throw e;
    }
  }

  async _builderObjectAccount(data) {
    const {
      first_name,
      last_name,
      email,
      city,
      bdate,
      screen_name,
      status,
      nickname,
      sex,
      photo
    } = data;

    // Convectors
    const convectors = {
      async sex(int) {
        const valid = {
          "0": "none",
          "1": "female",
          "2": "male"
        };

        return valid[String(int)];
      }
    };

    const model = {
      displayName: screen_name,
      names: {
        familyName: last_name,
        givenName: first_name,
        middleName: nickname
      },
      city: city.title,
      status,
      sex: await convectors.sex(sex),
      birthDate: new Date(bdate).toISOString(),
      email,
      photo
    };

    return model;
  }
}

module.exports = VKApplet;
