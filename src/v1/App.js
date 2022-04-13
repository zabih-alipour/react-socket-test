import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import InstrumentDetail from './components/InstrumentDetail'


function App() {
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:4000');
  const [instrument, setInstrument] = useState({});
  const [message, setMessage] = useState("");

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl);


  useEffect(() => {
    if (lastJsonMessage !== null) {
      const packet = lastJsonMessage

      if(instrument && instrument.type === packet.type){
        console.log("Incomming update for : " + JSON.stringify(packet));
        setInstrument((pre)=>{
          return {...pre, ...packet}
        });
      } else {
        console.log("Incomming message: " + JSON.stringify(packet));
        setInstrument(packet);
      }

    }
  }, [lastJsonMessage]);


  const onChange = ()=>{
    sendJsonMessage(JSON.parse(message));
  }

  return (
    <div className="App">
    <p>Send a message to server:</p>

    <input style={{width:"700px"}} onChange={(e)=>setMessage(e.target.value)}/>
    <input type="button"  onClick={onChange} value="Send"/>
    {
      instrument
      ?
      <div>Message last stat:
      <div>
        {JSON.stringify(instrument)}
      </div>
      </div>
      
      : <p> No message </p>

      
    }

    <InstrumentDetail instument={instrument}/>
    </div>
    );
}

export default App;
