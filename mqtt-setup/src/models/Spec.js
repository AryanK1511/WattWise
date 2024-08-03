const SinglePower = require("./SinglePower");

class Spec {
  constructor() {
    this.spec = [];
  }

  addSinglePower(power, date, is_public_holiday) {
    this.spec.push(new SinglePower(power, date, is_public_holiday));
  }

  cleanSpec() {
    this.spec = [];
  }

  getSpec() {
    return this.spec;
  }
}

module.exports = Spec;
