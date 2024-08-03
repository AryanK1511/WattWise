class SinglePower {
  static entryCounter = 0; // Static counter to track the number of entries

  constructor(power, timestamp, is_public_holiday) {
    const localDate = this.convertTimestampToTorontoTime(timestamp);
    this.power = power;
    this.timestamp = localDate.toISOString();
    this.weekday = this.convertWeekday(localDate.getDay());
    this.is_weekend = [5, 6].includes(this.weekday) ? 1 : 0; // Saturday (5) and Sunday (6) are weekends
    this.is_public_holiday = is_public_holiday ? 1 : 0;
    this.hour = this.calculateHour();
  }

  convertTimestampToTorontoTime(timestamp) {
    // Create a Date object from the Unix timestamp
    const date = new Date(timestamp);

    // Format the date to Toronto time
    const options = {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-CA", options);
    const parts = formatter.formatToParts(date);

    // Extract the parts
    const year = parts.find((part) => part.type === "year").value;
    const month = parts.find((part) => part.type === "month").value;
    const day = parts.find((part) => part.type === "day").value;
    const hour = parts.find((part) => part.type === "hour").value;
    const minute = parts.find((part) => part.type === "minute").value;
    const second = parts.find((part) => part.type === "second").value;

    // Construct a new Date object with the Toronto time
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }

  convertWeekday(day) {
    // Convert Sunday (0) to 6, and shift other days to start the week on Monday
    return day === 0 ? 6 : day - 1;
  }

  calculateHour() {
    // Increment the entry counter and calculate the hour
    SinglePower.entryCounter++;
    const hour = Math.floor(SinglePower.entryCounter / 15);
    return hour % 23;
  }
}

module.exports = SinglePower;
