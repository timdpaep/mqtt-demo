# MQTT Demo Used in the Web Of Things lessons

## Introduction
In this project you'll find three subprojects:
- `MQTT-Arduino-ESP`: This is an Arduino/ESP project that will connect to an MQTT broker.
- `server`: An express server that will handle HTTP methods and has an implementation of Socket.IO
- `client`: The frontend client to control the Arduino/ESP

## MQTT-Arduino-ESP
For this project, you're Arduino/ESP needs to have access to the LAN via WiFi or Ethernet. If not, you cannot run the Wifi.h library.

## Server
The server has some endpoints:
- `ledState`: will return the LED state, if it's on or off
- `toggleLed`: toggle the LED
- `startTimer`: starts an internal server timer
- `stopTimer`: stops the internal server timer

## Client
This is a React application to start the timer (will be fed via sockets) and toggle the LED on Arduino/ESP.

## Author
- Tim De Paepe <tim.depaepe@arteveldehs.be>