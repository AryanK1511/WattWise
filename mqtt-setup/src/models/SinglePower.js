class SinglePower {
  static entryCounter = 0; // Static counter to track the number of entries

  constructor(power, timestamp, is_public_holiday) {
    const utcDate = new Date(timestamp);
    if (!utcDate || isNaN(utcDate.getTime())) {
      throw new Error(`Invalid date: ${timestamp}`);
    }
    this.power = power;
    this.timestamp = utcDate.toISOString();
    this.weekday = this.convertWeekday(utcDate.getUTCDay());
    this.is_weekend = [5, 6].includes(this.weekday) ? 1 : 0; // Saturday (5) and Sunday (6) are weekends
    this.is_public_holiday = is_public_holiday ? 1 : 0;
    this.hour = this.calculateHour();
  }

  convertWeekday(day) {
    // Convert Sunday (0) to 6, and shift other days to start the week on Monday
    return day === 0 ? 6 : day - 1;
  }

  calculateHour() {
    // Increment the entry counter and calculate the hour
    SinglePower.entryCounter++;
    const hour = Math.floor(SinglePower.entryCounter / 15);
    return hour % 24; // Corrected to 24 to cover all hours in a day
  }
}

module.exports = SinglePower;
