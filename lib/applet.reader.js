const _ = require("lodash");
const { NotValidKeyForReader } = require("../lib/errors");

class AppletReader {
  constructor(paths) {
    this.paths = paths;
  }

  async convert(data = {}, paths = this.paths) {
    let returned = {};

    for (const staticKey in data) {
      const { typeValue, value, key } = await this.analizer(
        staticKey,
        data[staticKey]
      );

      if (typeof key === "object") {
        returned = await this.writer(returned, typeValue, key.name, await this.convert(value, key.paths));
      } else {
        returned = await this.writer(returned, typeValue, key, value);
      }
    }

    return returned;
  }

  async writer(returned, typeValue, key, value) {
    const convertedValue = await this.convertValue(value, typeValue);

    if (key.split(".").length > 1) {
      _.set(returned, key, convertedValue);
    } else {
      returned[key] = convertedValue;
    }
  }

  async convertValue(value, type) {
    switch (type) {
      case "object":
        if (_.isArray(value)) {
          const array = [];
          for (const item of value) {
            if (typeof item !== "object") {
              array.push(await this.convert(value));
            } else {
              array.push(item);
            }
          }
        } else {
          return await this.convert(value);
        }
      default:
        return value;
    }
  }

  async analizer(key, value) {
    const path = this.paths[key];
    const returned = { value, typeValue: typeof value };

    if (path) {
      return { ...returned, key: path };
    } else {
      throw new NotValidKeyForReader(`Not found in paths key : "${key}"`);
    }
  }
}

module.exports = AppletReader;
