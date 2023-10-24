import MQTTSingleton from "../lib/mqttSingleton.js"

/**
 * Toggle the led on our board
 * @param {*} req
 * @param {*} res
 */
export const toggleLed = (req, res) => {
  try {
    MQTTSingleton.getClient().publish('prop1/toggleLed');
    res.status(200).send('LED toggled');
  } catch(e) {
    console.error(e)
  }
}

/**
 * Ask for the LED state
 * @param {*} req
 * @param {*} res
 */
export const ledState = (req, res) => {
  try {
    MQTTSingleton.getClient().subscribeOnce('prop1/ledState').then((message) => {
      res.status(200).json({ ledState: message });
    });
    MQTTSingleton.getClient().publish('prop1/getLedState');
  } catch(e) {
    console.error(e)
  }
}