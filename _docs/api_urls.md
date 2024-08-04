# API Routes

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

### GET the Current Value

```bash
curl -X GET http://localhost:3000/power/arduino/current
```
