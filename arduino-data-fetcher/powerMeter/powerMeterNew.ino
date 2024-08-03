int potentiometerPin = A3;
int potValue = 0;

void setup() {
  Serial.begin(9600);
  pinMode(potentiometerPin, INPUT);
}

void loop() {
  potValue = analogRead(potentiometerPin);
  delay(1000);
}
