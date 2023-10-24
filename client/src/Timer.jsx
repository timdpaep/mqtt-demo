import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from './consts';

export default function Timer() {
  const [currentTime, setCurrentTime]  = useState("00:00");

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const socket = io(API_URL);
    socket.on('timerTick', (data) => {
      setCurrentTime(formatTime(data));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const startTimer = () => fetch(`${API_URL}/startTimer`);
  const stopTimer = () => fetch(`${API_URL}/stopTimer`);

  return(
    <div style={{ margin: "3rem" }}>
      <div>
        <div className='timer'>{currentTime}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr' }}>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  )
}

