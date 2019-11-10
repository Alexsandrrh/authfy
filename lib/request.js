module.exports = {
  async getDomain({ protocol, get }) {
    return protocol + "://" + get("host");
  }
};
