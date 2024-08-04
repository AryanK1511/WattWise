// Vin = 4.49V
// 5V = 5.04V


const int vsensor = A3;
float vIn;
float vOut;
float voltageSensorVal;
const float factor = 5.128;
const float vCC = 5.00;

void setup() {
  Serial.begin(9600);
}

void loop() {
  float average = 0;
  for(int i = 0; i < 1000; i++) 
  {
    average = average + (.0264 * analogRead(A1) -13.51) / 1000;
    delay(1);
  }

  // put your main code here, to run repeatedly:
  voltageSensorVal = analogRead(vsensor);
  vOut = (voltageSensorVal / 1024) * vCC;
  vIn = vOut * factor;

  //Serial.print("Voltage = ");
  //Serial.print(vIn - 12.59);
  //Serial.println("V");
  Serial.println(((vIn * average) + 1 ) * 500);
  delay(1000);
}
