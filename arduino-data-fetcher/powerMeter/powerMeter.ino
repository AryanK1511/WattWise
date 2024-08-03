int currentSensorPin = A1;
int voltageSensorPin = A2;
double csValue = 0;
double vsValue = 0;

// Testing Purposes
int potentiometerPin = A3;
int potValue = 0;

void setup() {
  pinMode(currentSensorPin, INPUT);
  pinMode(voltageSensorPin, INPUT);

  Serial.begin(9600);

  // Testing Purposes
  pinMode(potentiometerPin, INPUT);
  randomSeed(128);
}

void loop() {

  // Testing Purposes
  potValue = analogRead(potentiometerPin);
  Serial.println(potValue + random(50));

  delay(1000);
}
