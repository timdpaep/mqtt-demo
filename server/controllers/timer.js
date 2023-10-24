import Timer from '../lib/timer.js';
import timerSingleton from '../lib/timerSingleton.js';

/**
 * Start the internal timer
 * @param {*} req
 * @param {*} res
 */
export const startTimer = (req, res) => {
  try {
    timerSingleton.getInstance().start();
    res.status(200).send('Timer started');
  } catch(e) {
    console.error(e)
  }
}

/**
 * Stop the internal timer
 * @param {*} req
 * @param {*} res
 */
export const stopTimer = (req, res) => {
  try {
    timerSingleton.getInstance().stop();
    res.status(200).send('Timer stopped!');
  } catch(e) {
    console.error(e)
  }
}