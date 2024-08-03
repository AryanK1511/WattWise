# Hackthe6ix

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
