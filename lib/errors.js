class NotValidKeyForReader extends Error {
  constructor(message) {
    super(message);

    this.name = "NotValidKeyForReader";
  }
}

module.exports = { NotValidKeyForReader };
