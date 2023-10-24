/**
 * Written for educational purpose at Arteveldehogeschool
 * by Tim De Paepe <tim.depaepe@arteveldehs.be>
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <cstring>

/**
 * Variables
 */

// WiFi
const char *ssid = ""; // Enter your WiFi name
const char *password = "";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "";
const int mqtt_port = 1883;

// LED
bool ledOn = false;

// Prop name
const String propName = "prop1";
const char* mqttLedStateTopic = "prop1/ledState";
const char* mqttGetLedStateTopic = "prop1/getLedState";
const char* mqttToggleLedTopic = "prop1/toggleLed";

/**
 * Instances
 */

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setupWifi() {
  // Disable sleep mode
  WiFi.setSleep(false);

  // Connect to SSID
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }

  // Let them know
  Serial.println("Connected to the Wi-Fi network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  if (strcmp(topic, mqttGetLedStateTopic) == 0) {
    mqttClient.publish(mqttLedStateTopic, ledOn ? "on" : "off");
  } else if (strcmp(topic, mqttToggleLedTopic) == 0) {
    toggleLed();
  }
}

void setupMQTT() {
  // Connecting to a MQTT broker
  mqttClient.setServer(mqtt_broker, mqtt_port);

  // Set the callback whenever we receive a topic
  mqttClient.setCallback(mqttCallback);

  // Start connecting
  while (!mqttClient.connected()) {
    Serial.printf("The client %s connects to the MQTT broker\n", propName.c_str());
    if (mqttClient.connect(propName.c_str())) {
      Serial.println("MQTT broker connected!");
    } else {
      Serial.print("MQTT connection failed with state ");
      Serial.print(mqttClient.state());
      delay(2000);
    }
  }

  // Subscribe
  mqttClient.subscribe(mqttGetLedStateTopic);
  mqttClient.subscribe(mqttToggleLedTopic);
}

void setup() {
  // Set software serial baud to 115200;
  Serial.begin(9600);

  // Set pinmode
  pinMode(LED_BUILTIN, OUTPUT);

  // Dim the LED
  digitalWrite(LED_BUILTIN, LOW);

  // Setup WiFi
  setupWifi();

  // Setup MQTT
  setupMQTT();
}

/**
 * Turns the build in LED on or off, depending on the internal state
 */

void toggleLed() {
  if(ledOn) {
    ledOn = false;
    digitalWrite(LED_BUILTIN, LOW);
  } else {
    ledOn = true;
    digitalWrite(LED_BUILTIN, HIGH);
  }
}

/**
 * The loop function
 */

void loop() {
  mqttClient.loop();
}
