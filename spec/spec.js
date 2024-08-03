class SinglePower {
  constructor(power, hour, weekday, is_weekend, is_public_holiday) {
    this.power = power;
    this.hour = hour;
    this.weekday = weekday;
    this.is_weekend = is_weekend;
    this.is_public_holiday = is_public_holiday;
  }
}

class Spec {
  constructor() {
    this.spec = [];
  }

  addSinglePower(power, hour, weekday, is_weekend, is_public_holiday) {
    this.spec.push(
      new SinglePower(power, hour, weekday, is_weekend, is_public_holiday)
    );
  }

  cleanSpec() {
    this.spec = [];
  }

  getSpec() {
    return this.spec;
  }
}
