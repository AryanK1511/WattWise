# WattWise

WattWise is an innovative energy-saving app that uses an Arduino-powered device to monitor and predict household electricity usage and bills in real-time.

![WattWise logo](./assets/WattWise.png)

By providing a web-based dashboard with live data and bill predictions, it incentivizes users to reduce their energy consumption.

This solution not only helps save money but also promotes environmental sustainability by reducing overall electricity usage.

## API

To get power data, use the following URLs

> NOTE: the data will stream into the database every second, so it can take some time to get enough data for all queries to produce the expected values.

### GET All Power Data for the arduino

```bash
curl -X GET http://localhost:3000/power/arduino
```

### Limit the Number of Items Returned with `?limit=n`

```bash
http://localhost:3000/power/arduino?limit=10
```

### Define the Period of Results with `?since=time`

```bash
http://localhost:3000/power/arduino?since=1m
```

### GET the Current Value

```bash
curl -X GET http://localhost:3000/power/arduino/current
```

### Houses

House 1 averages around 600 during nights, 400 during days, and 700 during weekend and public holiday
House 2 averages on the higher side, 500 during weekdays, 900 during nights, and 1100 during weekend and public holidays
